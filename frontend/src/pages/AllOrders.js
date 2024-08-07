import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa6";
import SummaryApi from "../common";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const AllOrders = () => {
  const [AllOrders, setAllOrders] = useState([]);
  const fetchAllOrders = async () => {
    const response = await fetch(SummaryApi.getOrders.url, {
      method: SummaryApi.getOrders.method,

      headers: {
        "content-type": "application/json",
      },
    });

    const responseData = await response.json();
    console.log(responseData.data);
    setAllOrders(responseData.data);
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);
  function getDate(date) {
    let arrDate = date.split("-");
    let year = arrDate[0];
    let month = arrDate[1];
    let day = arrDate[2][0] + arrDate[2][1];

    return `${year}/ ${month}/ ${day}`;
  }

  async function deleteOrder(id) {
    const response = await fetch(SummaryApi.deleteOrder.url, {
      method: SummaryApi.deleteOrder.method,

      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        id: id,
      }),
    });
    const responseData = await response.json();

    if (responseData.success) {
      toast.success(responseData.message);
      fetchAllOrders();
    }

    if (responseData.error) {
      toast.error(responseData.message);
    }
  }

  return (
    <>
      <div className="flex flex-wrap -mx-3 mb-5">
        <div className="w-full max-w-full px-3 mb-6  mx-auto">
          <div className="relative flex-[1_auto] flex flex-col break-words min-w-0 bg-clip-border rounded-[.95rem] bg-white m-5">
            <div className="relative flex flex-col min-w-0 break-words border border-dashed bg-clip-border rounded-2xl border-stone-200 bg-light/30">
              <div className="px-9 pt-5 flex justify-between items-stretch flex-wrap min-h-[70px] pb-0 bg-transparent">
                <h3 className="flex flex-col items-start justify-center m-2 ml-0 font-medium text-xl/tight text-dark">
                  <span className="mr-3 font-semibold text-dark">
                    All Orders ( {AllOrders.length} )
                  </span>
                  <span
                    className="mt-1 font-medium text-secondary-dark text-lg/normal"
                    onClick={fetchAllOrders}
                  >
                    View your orders
                  </span>
                </h3>
              </div>

              <div className="flex-auto block py-8 pt-6 px-9">
                <div className="overflow-x-auto">
                  <table className="w-full my-0 align-middle text-dark border-neutral-200">
                    <thead className="align-bottom">
                      <tr className="font-semibold text-[0.95rem] text-secondary-dark">
                        <th className="pb-3 text-start min-w-[175px]">
                          Product
                        </th>
                        <th className="pb-3 text-end min-w-[100px]">Price</th>
                        <th className="pb-3 text-end min-w-[100px]">
                          Quantity
                        </th>
                        <th className="pb-3 pr-12 text-end min-w-[175px]">
                          Customer
                        </th>
                        <th className="pb-3 text-end min-w-[50px]">Contact</th>
                        <th className="pb-3 pr-12 text-end min-w-[100px]">
                          Date
                        </th>
                        <th className="pb-3 pr-12 text-end min-w-[100px]">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {AllOrders.map(
                        ({ productId, userId, _id, quantity, createdAt }) => {
                          return (
                            <tr className="border-b border-dashed last:border-b-0">
                              <td className="p-3 pl-0">
                                <Link to={"/product/" + productId._id}>
                                  <div className="flex items-center">
                                    <div className="relative inline-block shrink-0 rounded-2xl me-3">
                                      <img
                                        src={productId.productImage[0]}
                                        className="w-[50px] h-[50px] inline-block shrink-0 rounded-2xl"
                                        alt=""
                                      />
                                    </div>
                                    <div className="flex flex-col justify-start">
                                      <a className="mb-1 font-semibold transition-colors duration-200 ease-in-out text-lg/normal text-secondary-inverse hover:text-primary">
                                        {" "}
                                        {productId.productName}
                                      </a>
                                    </div>
                                  </div>
                                </Link>
                              </td>
                              <td className="p-3 pr-0 text-end">
                                <span className="font-semibold text-light-inverse text-md/normal">
                                  Nrs. {productId.sellingPrice}
                                </span>
                              </td>
                              <td className="p-3 pr-0 text-end">
                                <span className="text-center align-baseline inline-flex px-2 py-1 mr-auto items-center font-semibold text-base/none text-success bg-success-light rounded-lg">
                                  {quantity}
                                </span>
                              </td>
                              <td className="p-3 pr-12 text-end">
                                <span className="text-center align-baseline inline-flex px-4 py-3 mr-auto items-center font-semibold text-[.95rem] leading-none text-primary bg-primary-light rounded-lg">
                                  {" "}
                                  {userId.name}
                                </span>
                              </td>
                              <td className="pr-0 text-start">
                                <div className="font-semibold text-light-inverse text-md/normal">
                                  {userId.email}
                                </div>
                                <div className="font-bold text-light-inverse text-md/normal">
                                  {userId?.phone}
                                </div>
                                <div className="font-semibold text-light-inverse text-md/normal">
                                  {userId?.address}
                                </div>
                              </td>
                              <td className="p-3 pr-0 text-end">
                                <span className="font-semibold text-light-inverse text-md/normal">
                                  {getDate(createdAt)}
                                </span>
                              </td>
                              {/* <td></td> */}
                              <td className="p-3 pr-0 text-end flex justify-end items-center">
                                <FaTrash
                                  className="text-red-500 hover:scale-150 cursor-pointer transition-all"
                                  onClick={() => {
                                    deleteOrder(_id);
                                  }}
                                />
                              </td>
                            </tr>
                          );
                        }
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllOrders;
