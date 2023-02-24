import styles from "./preview.module.css";
const CarouselImg = ({ photos }) => {
  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;
    // this.setState({ backgroundPosition: `${x}% ${y}%` })
  };
  return (
    <div
      id="carouselExampleIndicators"
      className="carousel slide"
      data-bs-ride="true"
    >
      {photos ? (
        <>
          <div className={`carousel-indicators ${styles.carouselIndicators}`}>
            {photos.map((p, i) => {
              return (
                <button
                  key={i}
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide-to={i}
                  className={`${styles.imgMinContainer} ${
                    i === 0 ? "active" : ""
                  } `}
                  aria-current="true"
                  aria-label={`Slide ${i}`}
                >
                  <img
                    src={p}
                    className={`d-block w-100 ${styles.imgMinCarousel}`}
                    alt="..."
                  />
                </button>
              );
            })}
          </div>
          <div className="carousel-inner">
            {photos.map((p, i) => (
              <div
                key={i}
                className={`carousel-item  ${i === 0 ? "active" : ""} ${
                  styles.containerImg
                }`}
              >
                <img
                  src={p}
                  className={`d-block w-100 ${styles.imgCarousel}`}
                  alt="..sss."
                />
              </div>
            ))}
          </div>
        </>
      ) : (
        <p>cargando</p>
      )}
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default CarouselImg;
