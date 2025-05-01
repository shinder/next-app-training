"use client";

export default function ABTableNoLoggedIn({ rows = [] }) {
  return (
    <table className="table table-bordered table-striped">
      <thead>
        <tr>
          <th>#</th>
          <th>姓名</th>
          <th>電郵</th>
          <th>手機</th>
          <th>生日</th>
          <th>地址</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((v, i) => {
          return (
            <tr key={i}>
              <td>{v.ab_id}</td>
              <td>{v.name}</td>
              <td>{v.email}</td>
              <td>{v.mobile}</td>
              <td>{v.birthday2}</td>
              <td>{v.address}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
