import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import CartContainer from "../components/CartContainer";

const CartPage = () => {
  const navigate = useNavigate();
  const goBack = () => {
      navigate(-1);
  };

  const cartArray = [
    {
      name: "서민수",
      period: 14,
      books: [
        {
          title: "이기적 유전자",
          author: "리처드 도킨스",
          price: 100,
          status: "상",
          image: "https://placehold.co/41x60"
        },
        {
          title: "이기적 유전자",
          author: "리처드 도킨스",
          price: 50,
          status: "하",
          image: "https://placehold.co/41x60"
        },

      ]
      
    },
    {
      name: "정하림",
      period: 30,
      books: [
        {
          title: "이기적 유전자",
          author: "리처드 도킨스",
          price: 100,
          status: "상",
          image: "https://placehold.co/41x60"
        },
        {
          title: "이기적 유전자",
          author: "리처드 도킨스",
          price: 100,
          status: "상",
          image: "https://placehold.co/41x60"
        },
        {
          title: "이기적 유전자 adadasd asda dsadf sdfa sdflasjh",
          author: "리처드 도킨스 adfasdf asdfas df asdf asdf",
          price: 1000,
          status: "상",
          image: "https://placehold.co/41x60"
        },

      ]
      
    },
  ]

  return (
    <div className='mx-[25px] mt-6'>
      <div className="flex flex-row gap-1">
        <button onClick={goBack}>
          <IoIosArrowBack />
        </button>
        <p className="text-xl font-semibold ">장바구니</p>
      </div>

      <div>
        {cartArray.map((item, index) => {
          return (
            <CartContainer key={index} name={item.name} period={item.period} books={item.books} />
          )
        })}
      </div>

      
    </div>
  );
};

export default CartPage;