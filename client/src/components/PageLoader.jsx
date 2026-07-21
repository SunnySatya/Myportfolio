import "./PageLoader.css";

const PageLoader = () => {
  return (
    <div className="page-loader-container">
      <div className="page-loader-spinner">
        <div className="loader-ring loader-ring-1" />
        <div className="loader-ring loader-ring-2" />
        <div className="loader-ring loader-ring-3" />
      </div>
      <p className="page-loader-text">Loading...</p>
    </div>
  );
};

export default PageLoader;
