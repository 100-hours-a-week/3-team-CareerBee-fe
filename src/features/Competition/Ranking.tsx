import BarChart from '@/features/Competition/chart'

export default function Ranking() {

    return (
        <>
        <div className='flex justify-center'>
            <div className='font-ria font-bold text-[2rem]'>오늘의 TOP10</div>
        </div>
        <div className='flex mt-8'>
            <div className="flex mx-auto">
                <BarChart></BarChart>
            </div>
        </div>
        </>
    );
}
