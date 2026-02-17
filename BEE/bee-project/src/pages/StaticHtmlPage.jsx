function StaticHtmlPage({ src, title }) {
  return (
    <div style={{ height: "100vh", width: "100%", background: "#f1f5f9" }}>
      <iframe
        title={title}
        src={src}
        style={{
          width: "100%",
          height: "100%",
          border: "0",
          display: "block",
          background: "#f1f5f9",
        }}
      />
    </div>
  );
}

export default StaticHtmlPage;
