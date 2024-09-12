import { IoIosArrowBack } from 'react-icons/io';
import { IoNotificationsOutline } from 'react-icons/io5';
import { Link, useNavigate } from 'react-router-dom';

import { Tabs, TabsContent, TabsList, TabsTrigger } from 'components/ui/tabs';
import BookcaseContainer from '../components/BookcaseContainer';
import BookContainer from '../components/BookContainer';

const MyFavoritePage = () => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  const bookcaseArray = [
    {
      name: '정하림',
      imageArray: [
        'https://image.aladin.co.kr/product/18190/96/cover500/e893247390_1.jpg',
        'https://image.aladin.co.kr/product/18190/96/cover500/e893247390_1.jpg',
        'https://image.aladin.co.kr/product/18190/96/cover500/e893247390_1.jpg',
        'https://image.aladin.co.kr/product/18190/96/cover500/e893247390_1.jpg',
        'https://image.aladin.co.kr/product/18190/96/cover500/e893247390_1.jpg',
        'https://image.aladin.co.kr/product/18190/96/cover500/e893247390_1.jpg',
      ],
    },
    {
      name: '김도영',
      imageArray: [
        'https://image.aladin.co.kr/product/18190/96/cover500/e893247390_1.jpg',
        'https://image.aladin.co.kr/product/18190/96/cover500/e893247390_1.jpg',
        'https://image.aladin.co.kr/product/18190/96/cover500/e893247390_1.jpg',
      ],
    },
    {
      name: '서민수',
      imageArray: [
        'https://image.aladin.co.kr/product/18190/96/cover500/e893247390_1.jpg',
        'https://image.aladin.co.kr/product/18190/96/cover500/e893247390_1.jpg',
        'https://image.aladin.co.kr/product/18190/96/cover500/e893247390_1.jpg',
      ],
    },
  ];

  const bookArray = [
    {
      title: '이기적 유전자',
      author: '리처드 도킨스',
      rating: 4.5,
      detail:
        '세계적 베스트셀러, 과학을 넘어선 우리 시대의 고전, 『이기적 유전자』의 40주년 기념판. 진화론의 새로운 패러다임을 제시한 이 책은 다윈의 ‘적자생존과 자연선택’이라는 개념을 유전자 단위로 끌어내려 진화를 설명한다. 2013년 영국의 정치평론지 『프로스펙트』지가 독자...',
      image:
        'https://image.aladin.co.kr/product/18190/96/cover500/e893247390_1.jpg',
    },
    {
      title: '이기적 유전자',
      author: '리처드 도킨스',
      rating: 4.5,
      detail:
        '세계적 베스트셀러, 과학을 넘어선 우리 시대의 고전, 『이기적 유전자』의 40주년 기념판. 진화론의 새로운 패러다임을 제시한 이 책은 다윈의 ‘적자생존과 자연선택’이라는 개념을 유전자 단위로 끌어내려 진화를 설명한다. 2013년 영국의 정치평론지 『프로스펙트』지가 독자...',
      image:
        'https://image.aladin.co.kr/product/18190/96/cover500/e893247390_1.jpg',
    },
    {
      title: '해리포터와 마법사의 돌 1(해리포터 20주년 개정판)',
      author: 'J. K. 롤링',
      rating: 4.5,
      detail:
        '세계적 베스트셀러, 과학을 넘어선 우리 시대의 고전, 『이기적 유전자』의 40주년 기념판. 진화론의 새로운 패러다임을 제시한 이 책은 다윈의 ‘적자생존과 자연선택’이라는 개념을 유전자 단위로 끌어내려 진화를 설명한다. 2013년 영국의 정치평론지 『프로스펙트』지가 독자 세계적 베스트셀러, 과학을 넘어선 우리 시대의 고전, 『이기적 유전자』의 40주년 기념판. 진화론의 새로운 패러다임을 제시한 이 책은 다윈의 ‘적자생존과 자연선택’이라는 개념을 유전자 단위로 끌어내려 진화를 설명한다. 2013년 영국의 정치평론지 『프로스펙트』지가 독자',
      image:
        'https://image.aladin.co.kr/product/18190/96/cover500/e893247390_1.jpg',
    },
  ];

  return (
    <div>
      <header className='sticky top-0 z-10 bg-[#F8F6F3] flex items-center  justify-between p-6 mb-4'>
        <div className='items-center flex gap-2'>
          <button onClick={goBack} className='text-2xl '>
            <IoIosArrowBack />
          </button>
          <span className='font-extrabold text-2xl'>My Favorite</span>
        </div>
        <div className='flex justify-between text-2xl gap-5 text-[#545454]'>
          <Link to='/alarm'>
            <IoNotificationsOutline />
          </Link>
        </div>
      </header>
      <main className='px-6'>
        <Tabs defaultValue='bookcase' className='w-full'>
          <TabsList className='grid w-full grid-cols-2 '>
            <TabsTrigger value='bookcase'>책장</TabsTrigger>
            <TabsTrigger value='book'>책</TabsTrigger>
          </TabsList>
          <TabsContent value='bookcase'>
            {bookcaseArray.map((item, index) => {
              return (
                <div className='mx-3 my-5 bg-white/30 shadow rounded-lg p-4'>
                  <BookcaseContainer
                    key={index}
                    name={item.name}
                    imageArray={item.imageArray}
                  />
                </div>
              );
            })}
          </TabsContent>
          <TabsContent value='book'>
            {bookArray.map((item, index) => {
              return (
                <BookContainer
                  key={index}
                  title={item.title}
                  author={item.author}
                  rating={item.rating}
                  detail={item.detail}
                  image={item.image}
                />
              );
            })}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default MyFavoritePage;
