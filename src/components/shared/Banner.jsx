import { Zoom } from 'react-awesome-reveal';
import { Parallax } from 'react-parallax';

const Banner = ({image,title}) => {
    return (
        <div className='h-[400px] flex justify-center items-center bg-fixed bg-cover bg-center  w-full' style={{backgroundImage:`url(${image})`}}>
            <h1 className='text-white w-fit text-6xl font-bold'>
                <Zoom>{title}</Zoom>
            </h1>
        </div>
    );
};

export default Banner;