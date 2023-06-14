import thumb from '../../assets/thumb.jpg';
import Marquee from 'react-fast-marquee';
import { Rating } from '@mui/material';

const Testimonials = () => {
    
    const testimonials = [
        {
          name: "David Wilson",
          email: "david.wilson@example.com",
          image: "https://i.postimg.cc/NGPPzyqS/man1.jpg",
          rating: 4,
          message: "I had an amazing experience at News Pro. The classes were top-notch, providing in-depth knowledge and practical skills. The instructors were highly professional and supportive, offering valuable guidance throughout the program. The learning environment was dynamic and collaborative, allowing for meaningful interactions with fellow participants. I highly recommend News Pro to anyone looking to excel in the field of journalism."
        },
        {
          name: "Ethan Martinez",
          email: "ethan.martinez@example.com",
          image: "https://i.postimg.cc/wTmF40kR/man14.jpg",
          rating: 5,
          message: "News Pro exceeded my expectations. The classes were comprehensive, covering various aspects of journalism. The instructors were knowledgeable and passionate, creating a stimulating learning environment. I acquired valuable skills and insights that have helped me advance in my career. I'm grateful for the experience and highly recommend this program to aspiring journalists."
        },
        {
          name: "Sophia Anderson",
          email: "sophia.anderson@example.com",
          image: "https://i.postimg.cc/s1dPRCJQ/women1.jpg",
          rating: 4.5,
          message: "I can't say enough positive things about News Pro. The classes were engaging, and the instructors were experts in their field. They provided valuable feedback and guidance that greatly enhanced my skills. The program fostered a collaborative environment, allowing for meaningful discussions and networking opportunities. I'm grateful for the experience and highly recommend it to anyone looking to pursue a career in journalism."
        },
        {
          name: "Mia Walker",
          email: "mia.walker@example.com",
          image: "https://i.postimg.cc/1t8YmPDJ/women10.jpg",
          rating: 5,
          message: "News Pro was a game-changer for me. The classes were well-structured and packed with practical knowledge. The instructors were not only knowledgeable but also approachable, providing individual attention and support. The program offered a collaborative learning environment, fostering connections with fellow participants. I'm extremely satisfied with my experience and would highly recommend this program to anyone passionate about journalism."
        },
        {
          name: "Daniel Adams",
          email: "daniel.adams@example.com",
          image: "https://i.postimg.cc/MGWDTxJ1/man11.jpg",
          rating: 4.5,
          message: "Attending News Pro was a turning point in my journalism career. The classes were insightful, covering both theoretical concepts and practical skills. The instructors were highly experienced and provided valuable industry insights. The program offered a supportive and collaborative learning environment, allowing for constructive feedback and growth. I highly recommend this program to anyone looking to enhance their journalism skills."
        },
        {
          name: "Ethan Wright",
          email: "ethan.wright@example.com",
          image: "https://i.postimg.cc/vm3vxjGk/man13.jpg",
          rating: 5,
          message: "News Pro was an incredible learning experience. The classes were comprehensive and interactive, providing practical knowledge and hands-on training. The instructors were experts in their field and offered valuable guidance throughout the program. The supportive learning environment encouraged collaboration and knowledge sharing among participants. I'm extremely grateful for this opportunity and highly recommend News Pro to anyone passionate about journalism."
        },
        {
          name: "Jackson Murphy",
          email: "jackson.murphy@example.com",
          image: "https://i.postimg.cc/dVR6w3pq/man12.jpg",
          rating: 4,
          message: "I can confidently say that News Pro was a life-changing experience for me. The classes were thought-provoking and enriched with practical examples. The instructors were highly knowledgeable and passionate about teaching. They provided valuable insights and personalized guidance, helping me sharpen my skills. The program fostered a collaborative environment, allowing for meaningful connections with fellow participants. I highly recommend News Pro to anyone aspiring to excel in the field of journalism."
        },
        {
          name: "Ava Mitchell",
          email: "ava.mitchell@example.com",
          image: "https://i.postimg.cc/rFXYkBsN/women14.jpg",
          rating: 5,
          message: "I had an incredible experience at News Pro. The classes were engaging, and the instructors were highly knowledgeable and supportive. The program provided valuable insights and practical skills that have been instrumental in my journalism career. The learning environment was collaborative and inclusive, fostering connections with like-minded individuals. I highly recommend News Pro to anyone looking to jumpstart their journalism journey."
        },
        {
          name: "Ethan Wright",
          email: "ethan.wright@example.com",
          image: "https://i.postimg.cc/fLyfcKLL/man15.jpg",
          rating: 4.5,
          message: "News Pro exceeded my expectations. The classes were comprehensive, covering a wide range of topics relevant to journalism. The instructors were experienced professionals who provided valuable industry insights and practical guidance. The program offered a supportive and collaborative learning environment, allowing for networking and knowledge sharing. I'm grateful for the skills I gained and highly recommend this program to anyone passionate about journalism."
        }
      ];
      
    return (
        <div className='w-full'>
            {/* <Parallax
                blur={{ min: -15, max: 15 }}
                bgImage={thumb}
                bgStyle={{
                  objectFit: 'cover',
                  objectPosition: 'center',
                  width: '100%',
                  height: '100%',
                }}
                bgImageAlt="the dog"
                strength={100}
            >
                <div className='h-[600px]'>

                </div>
            </Parallax> */}
            <div className='bg-cover bg-center w-full bg-fixed' style={{backgroundImage:`url(${thumb})`}}>
            <div className='w-full py-44 bg-black bg-opacity-80'>
              <Marquee>
                {testimonials.map((testimonial,index)=><div key={index} className='w-[300px] md:w-[380px] mx-20 p-5 rounded-xl border relative'>
                  <div className='flex items-center gap-2'>
                    <img className='w-16 h-16 rounded-full border-2 border-white' src={testimonial.image} alt="" />
                    <div>
                      <p className='text-white text-sm font-bold'>{testimonial.name}</p>
                      <p className='text-xs text-gray-300'>{testimonial.email}</p>
                    </div>
                  </div>
                  <div className='mt-2'>
                    <p className='text-sm text-white text-justify leading-4 h-[200px] overflow-auto mb-10'>{testimonial.message}</p>
                  </div>
                  <div className='w-fit absolute bottom-0 right-2'>
                    <Rating name="read-only" value={testimonial.rating} readOnly />
                  </div>
                </div>)}
              </Marquee>
            </div>
            </div>
        </div>
    );
};

export default Testimonials;