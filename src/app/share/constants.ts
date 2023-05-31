import * as yup from "yup";

export type ShareMovie = {
  ytLink: string;
};

export const shareMovieValidationSchema = yup
  .object()
  .shape({
    ytLink: yup
      .string()
      .required("Link is required!")
      .test(
        "is-youtube-link",
        "Must input youtube watch link (https://www.youtube.com/watch?v={youtubeId})!",
        (value: string): boolean => {
          return value?.includes("https://www.youtube.com/watch?v=");
        }
      ),
  })
  .required();

export const defaultShareMovieValues: ShareMovie = {
  ytLink: "",
};
