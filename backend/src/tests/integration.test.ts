import chai from "chai";
import chaiHttp from "chai-http";
import { httpServer } from "..";
import { before, beforeEach, describe, it } from "node:test";
import { prisma } from "../prisma";
import { Movie, User } from "@prisma/client";
import { MockContext, Context, createMockContext } from "../context";
import { ShareMovieRequestBody } from "../types/movie.type";

chai.use(chaiHttp);
chai.should();

const newUser = {
  email: "new@gmail.com",
  password: "123456",
};

const newMovie: ShareMovieRequestBody = {
  ytLink: "https://www.youtube.com/watch?v=LMoMHP44-xM",
};

const newMovi2: ShareMovieRequestBody = {
  ytLink: "https://www.youtube.com/watch?v=BmUsDuLO598",
};

const incorrectYoutubeLink = "https://www.youtube.com/watch?v=1234567890";

const { expect } = chai;
let mockCtx: MockContext;
let ctx: Context;
let jwtToken: string | null;

describe("INTEGRATION TESTS", () => {
  before(async () => {
    // clear data in database before executing tests
    await prisma.movie.deleteMany();
    await prisma.user.deleteMany();
  });

  describe("USER API", () => {
    describe("POST /api/auth/login-or-register", () => {
      it("it should register a new valid user", async () => {
        const { status, body } = await chai
          .request(httpServer)
          .post("/api/auth/login-or-register")
          .send(newUser);
        expect(status).to.be.equal(201);
        expect(body).to.be.an("object");
        expect(body).to.have.property("isAuth").equal(true);
        expect(body).to.have.property("message").equal("");
        expect(body).to.have.property("data");
        expect(body).to.have.property("jwtToken");
        expect(body.data).not.equal(null);
        expect(body.data).to.have.property("email").equal(newUser.email);
      });

      it("it should login a valid user", async () => {
        const { status, body } = await chai
          .request(httpServer)
          .post("/api/auth/login-or-register")
          .send(newUser);
        expect(status).to.be.equal(200);
        expect(body).to.be.an("object");
        expect(body).to.have.property("isAuth").equal(true);
        expect(body).to.have.property("message").equal("");
        expect(body).to.have.property("data");
        expect(body).to.have.property("jwtToken");
        expect(body.data).equal(null);
        jwtToken = body.jwtToken;
      });

      it("it should not login an invalid user", async () => {
        const { status, body } = await chai
          .request(httpServer)
          .post("/api/auth/login-or-register")
          .send({ ...newUser, password: "1234567" });
        expect(status).to.be.equal(401);
        expect(body).to.be.an("object");
        expect(body).to.have.property("isAuth").equal(false);
        expect(body)
          .to.have.property("message")
          .equal("Username and password are not matched");
        expect(body.jwtToken).equal(null);
        expect(body.data).equal(null);
      });
    });
  });

  describe("MOVIE API", () => {
    describe("POST /api/movie/share", () => {
      it("it should create a new valid movie", async () => {
        const { status, body } = await chai
          .request(httpServer)
          .post("/api/movie/share")
          .set("Authorization", `Bearer ${jwtToken}`)
          .send(newMovie);
        expect(status).equal(200);
        expect(body).to.be.an("object");
        expect(body).to.have.property("success").equal(true);
        expect(body).to.have.property("isDuplicatedLink").equal(false);
        expect(body).to.have.property("message").equal("");
        expect(body).to.have.property("data");
        expect(body.data).not.equal(null);
        expect(body.data).to.have.property("id").not.equal(null);
        expect(body.data)
          .to.have.property("youtubeLink")
          .equal(newMovie.ytLink);

        const videoId: string | null = new URL(
          newMovie.ytLink
        ).searchParams.get("v");
        expect(body.data)
          .to.have.property("videoLink")
          .equal(`https://www.youtube.com/embed/${videoId}?feature=oembed`);
      });

      it("it should not create a new movie when duplicated link", async () => {
        const { status, body } = await chai
          .request(httpServer)
          .post("/api/movie/share")
          .set("Authorization", `Bearer ${jwtToken}`)
          .send(newMovie);
        expect(status).equal(200);
        expect(body).to.be.an("object");
        expect(body).to.have.property("success").equal(false);
        expect(body).to.have.property("isDuplicatedLink").equal(true);
        expect(body).to.have.property("message").equal("");
        expect(body).to.have.property("data");
        expect(body.data).equal(null);
      });

      it("it should not create a new movie when the link is incorrect", async () => {
        const { status, body } = await chai
          .request(httpServer)
          .post("/api/movie/share")
          .set("Authorization", `Bearer ${jwtToken}`)
          .send({ ytLink: incorrectYoutubeLink });
        expect(status).equal(200);
        expect(body).to.be.an("object");
        expect(body).to.have.property("success").equal(false);
        expect(body).to.have.property("isDuplicatedLink").equal(false);
        expect(body)
          .to.have.property("message")
          .equal("The youtube video link is incorrect!");
        expect(body).to.have.property("data");
        expect(body.data).equal(null);
      });
    });

    describe("GET /api/movie", async () => {
      it("it should return correect list ordered by id desc", async () => {
        // create 1 more movie by request to /api/movie/share endpoint
        await chai
          .request(httpServer)
          .post("/api/movie/share")
          .set("Authorization", `Bearer ${jwtToken}`)
          .send(newMovi2);

        // check the response value if it's valid
        const { status, body } = await chai
          .request(httpServer)
          .get("/api/movie")
          .send(newMovi2);
        expect(status).to.be.equal(200);
        expect(body).to.be.an("array").length(2);
        expect(body[0].id).greaterThan(body[1].id);
      });
    });
  });
});
