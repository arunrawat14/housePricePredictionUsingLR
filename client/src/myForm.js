import React, { useEffect, useState } from 'react';
import './index.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/ReactToastify.css'

const apiUrl = process.env.REACT_APP_API_URL;



const MyForm = () => {
    const [formData, setFormData] = useState({
        total_sqft: "",
        location: "",
        bhk: "",
        bath: "",
    });

    const [locations, setLocation] = useState()
    const [output, setOutput] = useState()

    function changeHandler(event) {

        const { name, value } = event.target;

        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault()


        console.log(formData)

        if( formData.bath && formData.bhk && formData.total_sqft && formData.location  ) {

            try {
                // Send form data to Flask server using Axios
                console.log(`${apiUrl}/predict_home_price`)
                const response = await axios.post(`${apiUrl}/predict_home_price`, formData);
                console.log(response.data); // handle response from server if needed
                setOutput(response.data);
                toast.success("Successfuly fetched info from the ml model", {
                    position: "top-center"
                })
            } catch (error) {
                console.error('Error submitting form:', error);
                toast.error(' Server Error ', {
                    position: "top-center",
                  }
                );
            }

        } else {
            toast.error('Fill all entries  first', {
                position: "top-center",
              }
        );
            
        }
    }

        function clearForm() {
            setFormData({
                total_sqft: "",
                location: "",
                bhk: "",
                bath: "",
            });

            setOutput("")
        }


    useEffect(() => {
        
        console.log(`${apiUrl}/get_location_names`)

        axios.get(`${apiUrl}/get_location_names`)
            .then(response => {
                setLocation(response.data.locations);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    console.log("location is: ", locations)

    return (

        <div className=' ' >

            <form className="  rounded-xl shadow-xl backdrop:lg:     " onSubmit={onSubmitHandler}>
                <div className="flex rounded-xl   font-bold flex-col justify-center items-center gap-2 w-full border-solid border-[1px] 
                border-slate-300 hover:shadow-xl transition-all duration-800  ">

                    <div className=" w-full  mt-8 flex flex-wrap  justify-center items-center  gap-10">
                        <label htmlFor="total_sqft" className=" w-[40%] pt-3    text-2xl ">TOTAL SQFT</label>
                        <input type="text" step="1" name='total_sqft' onChange={changeHandler} value={formData.total_sqft} id='total_sqft' className="border-solid border-[1px]  
                        border-slate-400   bg-white  w-[40%]  hover:shadow-xl transition-all duration-800 rounded-lg h-[40px] px-2 shadow-lg"  />
                    </div>

                    <div className=" w-full m-1 flex-wrap flex  justify-center items-center  gap-10">
                        <label htmlFor="bhk" className=" w-[40%] pt-3    font-bold text-2xl ">ROOMS </label>
                        <input type="text" step="1" name='bhk' onChange={changeHandler} value={formData.bhk} id='bhk' className="border-solid border-[1px]  
                        border-slate-400 w-[40%] bg-white hover:shadow-lg transition-all duration-800 rounded-lg h-[40px] px-2 shadow-lg" />
                    </div>
                    <div className=" w-full m-1 flex flex-wrap  justify-center items-center  gap-10 ">
                        <label htmlFor="bath" className=" w-[40%] pt-3    font-bold text-2xl ">BATHROOMS</label>
                        <input type="text" step="1" name='bath' onChange={changeHandler} value={formData.bath} id='bath' className="border-solid border-[1px]  
                        border-slate-400 w-[40%] bg-white hover:shadow-lg transition-all duration-800 rounded-lg h-[40px] px-2 shadow-lg" />
                    </div>
                    <div className="w-full flex-wrap flex  justify-center items-center  gap-10">
                        <label htmlFor="location" className=" w-[40%] pt-3   font-ibold text-2xl   ">LOCATION</label>
                        <select name='location' placeholder='Select Location' onChange={changeHandler} value={formData.location} id='location' className='border-solid border-[1px] border-slate-400 w-[40%] bg-white hover:shadow-xl transition-all duration-800 rounded-lg h-[40px] px-2 shadow-lg'>
                        <option value=''>Select Location</option>
                            {locations ? (
                                locations.map((val, index) => (
                                    <option key={index} value={val}>{val}</option>
                                ))
                            ) : null}
                        </select>
                    </div>

                    <div className='flex justify-center items-center gap-5'>
                    <button type='submit' className=' btn m-10  bg-slate-600 transition-all duration-200  text-white   hover:shadow-2xl hover:bg-slate-900  hover:text-white font-bold py-2 px-4 rounded-full'>
                        Submit
                    </button>
                    
                    <button type="button" onClick={clearForm} className=' btn m-10  bg-slate-600 transition-all duration-200  text-white   hover:shadow-2xl hover:bg-slate-900  hover:text-white font-bold py-2 px-4 rounded-full'>
                        Clear
                    </button>

                    </div>
                    

                </div>

            </form>

            {
                output ? (
                    <div className=' border-solid border-[1px] rounded-xl border-slate-300  hover:shadow-2xl shadow-md  transition-all  bg-slate-50 duration-800  mt-10  w-full flex items-center justify-center h-[10%] text-Black font-bold text-2xl'>
                        <pre className=' flex justify-center rounded-xl p-2 bg-white w-full h-full items-center font-bold '> ESTIMATED COST:  <div className=' linear-text-gradient-03'>{output.estimated_price} LAKHS</div> </pre>
                    </div>
                ) : null
            }


        </div>


    );
}

export default MyForm;
