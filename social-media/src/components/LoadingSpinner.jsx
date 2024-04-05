/** @format */
import "../posts.css";

const LoadingSpinner = ({ msg }) => {
  return (
    <>
      <div
        className="d-flex justify-content-center"
        style={{ paddingBottom: "200px" }}
      >
        <div
          className="spinner-border spinner-class"
          style={{ width: "3.5rem", height: "3.5rem" }}
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </>
  );
};

export default LoadingSpinner;
