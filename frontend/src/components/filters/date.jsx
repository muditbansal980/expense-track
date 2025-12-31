export default function Datefilter(props){
    return(
        <div className ="w-full flex bg-amber-900 gap-[10px] p-[10px]" >

            <div onClick={()=>props.onFilter("all")} className="bg-transparent pt-[5px] pb-[5px] pl-[10px] pr-[10px] flex justify-center items-center border-[1px] border-[white] p-[10px] text-white hover:cursor-pointer">All</div>
            <div  className="inline-block h-auto w-0.5 self-stretch bg-neutral-100 dark:bg-white/10"></div>
            <div onClick={()=>props.onFilter(0)} className="text-1 bg-transparent p-[5px]  border-[1px] flex justify-center items-center border-[white] p-[10px] text-white hover:cursor-pointer">Today</div>
            <div onClick={()=>props.onFilter(3)} className="text-1 bg-transparent p-[5px]  border-[1px] flex justify-center items-center border-[white] p-[10px] text-white hover:cursor-pointer">Past 3 days</div>
            <div onClick={()=>props.onFilter(7)} className="text-1 bg-transparent p-[5px]  border-[1px] flex justify-center items-center border-[white] p-[10px] text-white hover:cursor-pointer">Past 7 days</div>
            <div onClick={()=>props.onFilter(30)} className="text-1 bg-transparent p-[5px]  border-[1px] flex justify-center items-center border-[white] p-[10px] text-white hover:cursor-pointer">Past 30 days</div>
        </div>
    )
}