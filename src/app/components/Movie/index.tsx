"use client"
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import styles from './styles.module.css';


export default function Movie() {
  return (
    <div className="row movie mb-3">
      <div className="col-5 pr-2">
        <iframe
          className={styles['movie__youtube-video']}
          src="https://www.youtube.com/embed/3CBD5JZJJKw"
          title="I Waited 15 Years For These New Array Methods"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      </div>
      <div className="col-7 pl-2">
        <div className={styles['movie__title']}>Movie title</div>
        <div className="movie__share-desc">Shared by someone@gmail.com</div>
        <div className="movie__like-dislike"></div>
        <div className={styles['movie__desc']}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos nam inventore voluptate quaerat unde, corporis perferendis fuga eius rem numquam tenetur et magni, nesciunt hic recusandae libero eveniet tempore. Cupiditate?</div>
      </div>
    </div>
  )
}
