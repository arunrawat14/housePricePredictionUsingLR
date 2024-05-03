
import './App.css';
import MyForm from './myForm';
import ImageChanger from './imageChanger';



function App() {
  return (
    <div className=' w-[100vw] h-[100vh]  divmain'>


      <div className='flex w-full h-full flex-col'>

          <div className=' toplevel  mt-10 w-fit flex flex-col gap-4 flex-wrap   font-bold  text-5xl ml-72    '> 
           <div className=' w-fit linear-text-gradient-03 '> Prediction House Price   </div>  
                <div className=' w-fit  text-gray-300 ml-40 subtop '>  Using Linear Regression Model</div>
          </div>
      
        <div className=" bottolevel  w-[100%] h-[100%] flex   justify-center   gap-36 items-center  ">
          <MyForm />

          <div className='border-solid border-[1px] 
                border-slate-300 hover:shadow-lg image  rounded-md w-[25%] h-[50%] shadow-xl hover:scale-125 transition-all duration-200 cursor-pointer'>
            <ImageChanger />
          </div>
        </div>

      </div>





    </div>
  );
}

export default App;
