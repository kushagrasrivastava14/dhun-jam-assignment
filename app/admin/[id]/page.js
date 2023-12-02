"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import Chart from "react-apexcharts";

const Admin = ({ params }) => {
  const [response, setResponse] = useState();

  const options = {
    chart: {
      id: "apexchart-example",
    },
    xaxis: {
      categories: [
        "custom",
        "category 1",
        "category 2",
        "category 3",
        "category 4",
      ],
    },
  };

  const updateData = () => {

    axios.put("https://stg.dhunjam.in/account/admin/4", {
        amount: {
          category_6: 100
        }
      })
        .then(response => {
          // Handle the response
          console.log(response);
        })
        .catch(error => {
          // Handle errors
          console.error(error);
        });
  }
  
 
  useEffect(() => {
    axios({
      method: "get",
      url: `https://stg.dhunjam.in/account/admin/${params.id}`,
    }).then((res) => setResponse(res));
  }, []);

  const series = [
    {
      name: "series-1",
      data: [
        response?.data?.data?.amount?.category_6,
        response?.data?.data?.amount?.category_7,
        response?.data?.data?.amount?.category_8,
        response?.data?.data?.amount?.category_9,
        response?.data?.data?.amount?.category_10,
      ],
    },
  ];

  return (
    <div className="max-w-[500px] overflow-hidden  h-screen flex flex-col justify-center items-center gap-2   m-auto ">
      <div className="text-heading">
        {" "}
        {response?.data?.data?.name}, {response?.data?.data?.location} on Dhun
        Jam{" "}
      </div>
      <div className="flex  w-[500px] ">
        {" "}
        <div className="w-[75%] flex justify-start ">
          <p className="">
            Do you want to charge your customers for requesting songs
          </p>{" "}
        </div>
        <div className="w-[25%]   ">
          <input type="radio" id="yes" value={true}></input>  {" "}
          <label htmlFor="yes">Yes</label>{" "}
          <input type="radio" id="no" value={"no"}></input>  {" "}
          <label htmlFor="no">No</label>{" "}
        </div>
      </div>
      <div className="flex justify-center w-[500px] ">
        <div className="w-[75%] flex  justify-start "> <p>
            Custom song request?
            </p> 
             </div>
        <div className="w-[] flex justify-end ">
          <input
            className="bg-transparent text-gray-400 border-gray-400 border w-fit rounded-sm "
            type="text"
            value={response?.data?.data?.amount?.category_6}
          />{" "}
        </div>
      </div>
      <div className="flex gap-1 justify-center items-center w-[500px]  ">
      <div className="w-[50%] flex justify-start " >

        Regular songs request amount low to high{" "}
        </div>
        <div className="w-[50%] flex justify-end gap-2" >
        <p className="py-1 px-4 border rounded-sm border-gray-200 w-fit ">
          {response?.data?.data?.amount?.category_7}{" "}
        </p>
        <p className="py-1 px-4 border rounded-sm border-gray-200 w-fit ">
          {response?.data?.data?.amount?.category_8}
        </p>
        <p className="py-1 px-4 border rounded-sm border-gray-200 w-fit ">
          {response?.data?.data?.amount?.category_9}{" "}
        </p>
        <p className="py-1 px-4 rounded-sm border border-gray-200 w-fit ">
          {response?.data?.data?.amount?.category_10}{" "}
        </p>
        </div> 
      </div>

      <Chart
        options={options}
        series={series}
        type="bar"
        width={500}
        height={320}
      />
       <button className="bg-[#6741D9] px-5 w-96 rounded-md " type="button" onClick={()=>updateData()} >
        Save
      </button>
    </div>
  );
};

export default Admin;
