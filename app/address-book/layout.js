
export const metadata = {
  title: "通訊錄 - 小新的網站",
  description: "通訊錄管理",
};

export default function ABLayout({ children}) {
  return (
    <>
      <div style={{width:'100%', height:'10px', backgroundColor: 'lightcyan'}}></div>
      {children}
    </>
  );
}
