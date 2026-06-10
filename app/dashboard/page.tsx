export default function Dashboard() {
  return (
    <div
      style={{
        background: "black",
        color: "white",
        minHeight: "100vh",
        padding: "40px",
      }}
    >
      <h1
        style={{
          fontSize: "40px",
        }}
      >
        پنل کاربری
      </h1>

      <div
        style={{
          marginTop: "30px",
          padding: "20px",
          border: "1px solid gray",
          borderRadius: "10px",
        }}
      >
        <h2>اطلاعات کاربر</h2>

        <p>وارد شدی ✅</p>
      </div>
    </div>
  );
}