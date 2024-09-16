import { IoSearchOutline } from "react-icons/io5";
import { useState, useEffect } from "react";
import { useDebouncedCallback } from "use-debounce";

const trendingUrl =
  "https://api.giphy.com/v1/gifs/trending?api_key=eHA23jWbdhOWZdTrKkNlzszz8tz8n9GH";

const Home = () => {
  const [gifname, setGifName] = useState("");
  const [gifs, setGifs] = useState([]);
  const [trendingGifs, setTrendingGifs] = useState([]);
  const [offSet, setOffSet] = useState(0);

  useEffect(() => {
    const getGifs = async () => {
      const response = await fetch(trendingUrl);
      const { data } = await response.json();
      setTrendingGifs(data);
    };
    getGifs();
  }, []);

  const onchange = (e) => {
    setGifName(e.target.value);
  };

  const search = async () => {
    const url = `https://api.giphy.com/v1/gifs/search?api_key=eHA23jWbdhOWZdTrKkNlzszz8tz8n9GH&q=${gifname}&limit=25&offset=0&rating=g&lang=en&bundle=messaging_non_clips`;
    try {
      const response = await fetch(url);
      const { data } = await response.json();
      setGifs(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const debouncedSearch = useDebouncedCallback(search, 2000);
  console.log(gifs);
  const numbers = [0, 1, 2, 3, 4];
  const offset = async (number) => {
    setOffSet(number * 25);
    const url = `https://api.giphy.com/v1/gifs/search?api_key=eHA23jWbdhOWZdTrKkNlzszz8tz8n9GH&q=${gifname}&limit=25&offset=${offSet}&rating=g&lang=en&bundle=messaging_non_clips`;
    const response = await fetch(url);
    const { data } = await response.json();
    setGifs(data);
  };
  return (
    <>
      <div className="mx-auto p-2 flex justify-between w-fit items-center border border-solid border-gray-500 rounded-3xl mt-[200px]">
        <input
          placeholder="search"
          onChange={(event) => onchange(event)}
          onKeyUp={debouncedSearch}
        />
        <IoSearchOutline onClick={search} />
      </div>
      <div className="mx-auto">
        {numbers.map((number, index) => {
          return (
            <button
              onClick={() => offset(number)}
              key={index}
              className="px-10 bg-blue-400 py-4 ml-3"
            >
              {number}
            </button>
          );
        })}
      </div>
      <div className="grid grid-cols-3">
        {gifs.map((gif, index) => {
          return <img src={gif.images.fixed_height.url} key={index} />;
        })}
      </div>
    </>
  );
};

export default Home;
