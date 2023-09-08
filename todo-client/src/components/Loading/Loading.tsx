import "./styles.css";

export const Loading = () => (
  <div className="flex justify-center align-middle w-full h-full">
    <div className="lds-ring">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
);
