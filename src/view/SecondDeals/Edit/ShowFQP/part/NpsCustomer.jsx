import React from 'react'

const NpsCustomer = ({data, position}) => {
  return (
      <>
      {position !== "1-bZKHtNZCFWGg" && position !== "573MloZ8j--aaQ" && position !== "SzhgAQn6tP48xw" ?(
        <>
        <div class="fw-bold mb-3">
            <span className="fs-6 text-decoration-underline">NPS Customer</span>
        </div>
            <table className="mb-4">
                <tr className="fw-medium">
                <td style={{ width: "300px", fontSize: "0.9rem" }}>Promoters</td>
                <td className="px-1">:</td>
                <td colspan="3">
                    <ul>
                    <li>
                        {data && data.promoters && data.promoters.length > 0
                        ? data.promoters[0]?.name
                        : "-"}
                    </li>
                    <li>
                        {data && data.promoters && data.promoters.length > 1
                        ? data.promoters[1]?.name
                        : "-"}
                    </li>
                    <li>
                        {data && data.promoters && data.promoters.length > 2
                        ? data.promoters[2]?.name
                        : "-"}
                    </li>
                    </ul>
                </td>
                </tr>
                <tr className="fw-medium">
                <td style={{ width: "300px", fontSize: "0.9rem" }}>Neutrals</td>
                <td className="px-1">:</td>
                <td>
                    <ul>
                    <li>
                        {data && data.neutrals && data.neutrals.length > 0
                        ? data.neutrals[0]?.name
                        : "-"}
                    </li>
                    <li>
                        {data && data.neutrals && data.neutrals.length > 1
                        ? data.neutrals[1]?.name
                        : "-"}
                    </li>
                    <li>
                        {data && data.neutrals && data.neutrals.length > 2
                        ? data.neutrals[2]?.name
                        : "-"}
                    </li>
                    </ul>
                </td>
                </tr>
                <tr className="fw-medium">
                <td style={{ width: "300px", fontSize: "0.9rem" }}>Detractors</td>
                <td className="px-1">:</td>
                <td>
                    <ul>
                    <li>
                        {data && data.detcractors && data.detcractors.length > 0
                        ? data.detcractors[0]?.name
                        : "-"}
                    </li>
                    <li>
                        {data && data.detcractors && data.detcractors.length > 1
                        ? data.detcractors[1]?.name
                        : "-"}
                    </li>
                    <li>
                        {data && data.detcractors && data.detcractors.length > 2
                        ? data.detcractors[2]?.name
                        : "-"}
                    </li>
                    </ul>
                </td>
                </tr>
            </table>
      </>
      ) : ""}
    </> 
  )
}

export default NpsCustomer