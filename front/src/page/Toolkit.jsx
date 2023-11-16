import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import ToolkitCard from "../component/ToolkitCard";
import Typewriter from "typewriter-effect";

import { CiPen } from "react-icons/ci";
import { GoX } from "react-icons/go";
import { CiSearch } from "react-icons/ci";
import ToolkitCategory from "../component/ToolkitCategory";
// import { TOOLKIT_URL } from "../config";

export default function Toolkit() {
  const [categories, setCategories] = useState([
    { title: "All", isActive: true },
    { title: "청년", isActive: false },
    { title: "퀴어", isActive: false },
    { title: "시각장애", isActive: false },
    { title: "청각장애", isActive: false },
    { title: "이동약자", isActive: false },
    { title: "비진학", isActive: false },
    { title: "여성·젠더", isActive: false },
  ]);

  const [categories2, setCategories2] = useState([
    { title: "All", isActive: true },
    { title: "커뮤니티 구성원", isActive: false },
    { title: "커뮤니티 기획자", isActive: false },
  ]);

  const [categories3, setCategories3] = useState([
    { title: "All", isActive: true },
    { title: "비빔", isActive: false },
    { title: "아카이브", isActive: false },
  ]);
  const [filteredToolkits, setFilteredToolkits] = useState([]);
  const [text, setText] = useState("");
  const [searchToolkits, setSearchToolkits] = useState([]);
  const [errorMessage, setErrorMessage] = useState("검색결과가 없습니다.");

  // const {
  //   isLoading,
  //   error,
  //   data: toolkits,
  // } = useQuery(["toolkits"], async () => {
  //   const res = await axios.get(TOOLKIT_URL);
  //   console.log(res.data);
  //   return res.data;
  // });

  const {
    isLoading,
    error,
    data: toolkits,
  } = useQuery(["toolkits"], async () => {
    return axios //
      .get(process.env.PUBLIC_URL + "/data/Toolkit.json") //
      .then((res) => res.data.items.toolkits);
  });

  console.log(toolkits);

  const [category, setCategory] = useState("All");
  const [category2, setCategory2] = useState("All");
  const [category3, setCategory3] = useState("All");

  const handleCategoryClick = (clickedCategory) => {
    setCategory(clickedCategory);

    // Update isActive for each category based on the clicked category
    const updatedCategories = categories.map((cate) => ({
      ...cate,
      isActive: cate.title === clickedCategory,
    }));
    setCategories(updatedCategories);

    setText("");
    setSearchToolkits([]);

    if (category2 === "" && category3 === "") {
      setCategories2((prev) =>
        prev.map((category) => {
          if (category.title === "All") {
            return { ...category, isActive: true };
          } else {
            return category;
          }
        })
      );

      setCategories3((prev) =>
        prev.map((category) => {
          if (category.title === "All") {
            return { ...category, isActive: true };
          } else {
            return category;
          }
        })
      );

      setCategory2("All");
      setCategory3("All");
    }
  };

  const handleCategoryClick2 = (clickedCategory) => {
    setCategory2(clickedCategory);

    // Update isActive for each category based on the clicked category
    const updatedCategories = categories2.map((cate) => ({
      ...cate,
      isActive: cate.title === clickedCategory,
    }));
    setCategories2(updatedCategories);

    setText("");
    setSearchToolkits([]);

    if (category === "" && category3 === "") {
      setCategories((prev) =>
        prev.map((category) => {
          if (category.title === "All") {
            return { ...category, isActive: true };
          } else {
            return category;
          }
        })
      );

      setCategories3((prev) =>
        prev.map((category) => {
          if (category.title === "All") {
            return { ...category, isActive: true };
          } else {
            return category;
          }
        })
      );

      setCategory("All");
      setCategory3("All");
    }
  };

  const handleCategoryClick3 = (clickedCategory) => {
    setCategory3(clickedCategory);

    // Update isActive for each category based on the clicked category
    const updatedCategories = categories3.map((cate) => ({
      ...cate,
      isActive: cate.title === clickedCategory,
    }));
    setCategories3(updatedCategories);

    setText("");
    setSearchToolkits([]);

    if (category === "" && category2 === "") {
      setCategories((prev) =>
        prev.map((category) => {
          if (category.title === "All") {
            return { ...category, isActive: true };
          } else {
            return category;
          }
        })
      );

      setCategories2((prev) =>
        prev.map((category) => {
          if (category.title === "All") {
            return { ...category, isActive: true };
          } else {
            return category;
          }
        })
      );

      setCategory("All");
      setCategory2("All");
    }
  };

  console.log(categories, categories2, categories3);
  console.log(category, category2, category3);
  console.log(searchToolkits.length);

  useEffect(() => {
    let filteredList = toolkits;

    if (category !== "All") {
      filteredList = filteredList.filter(
        (toolkit) => toolkit.type === category
      );
    }

    if (category2 !== "All") {
      filteredList = filteredList.filter(
        (toolkit) => toolkit.type2 === category2
      );
    }

    if (category3 !== "All") {
      filteredList = filteredList.filter(
        (toolkit) => toolkit.creator === category3
      );
    }

    setFilteredToolkits(filteredList);
  }, [category, category2, category3, toolkits]);

  const handleDeleteTitle = () => {
    setText("");
  };

  const handleSearchToolkit = (e) => {
    e.preventDefault();

    const trimmedText = text.trim();

    if (trimmedText !== "") {
      setSearchToolkits(
        toolkits.filter((toolkit) => {
          const removedSpaceTitle = toolkit.title.replace(/ /g, "");
          const removedSpaceDescription = toolkit.description.replace(/ /g, "");

          const removedSpaceText = text.replace(/ /g, "");

          return (
            removedSpaceTitle.replace(/ /g, "").includes(removedSpaceText) ||
            removedSpaceDescription.includes(removedSpaceText)
          );
        })
      );

      if (searchToolkits.length === 0) {
        setErrorMessage("검색결과가 없습니다.");
      }
    } else if (trimmedText === "" || searchToolkits.length === 0) {
      setSearchToolkits([]);
      setErrorMessage("검색결과가 없습니다.");
    }

    setCategories((prev) =>
      prev.map((category) => {
        if (category.isActive === true) {
          return { ...category, isActive: false };
        } else {
          return category;
        }
      })
    );

    setCategories2((prev) =>
      prev.map((category) => {
        if (category.isActive === true) {
          return { ...category, isActive: false };
        } else {
          return category;
        }
      })
    );

    setCategories3((prev) =>
      prev.map((category) => {
        if (category.isActive === true) {
          return { ...category, isActive: false };
        } else {
          return category;
        }
      })
    );

    setCategory("");
    setCategory2("");
    setCategory3("");
  };

  return (
    <div className="w-full bg-[#ffffff] dark:bg-black pt-16 flex flex-col justify-between items-center font-medium">
      <div className="w-11/12 mx-auto flex flex-col items-center">
        <div className="w-full mb-6 flex flex-col justify-center items-center">
          <div className="w-full text-[#79B1FF] sm:text-[1.5rem] text-[1.2rem] flex justify-center items-center">
            <CiPen />
            <p className="ml-3 font-semibold">Toolkit</p>
          </div>

          <div className="sm:mt-6 mt-3 sm:text-[2.8rem] text-[2.2rem] dark:text-white text-center font-extrabold">
            <Typewriter
              onInit={(typewriter) => {
                typewriter
                  .typeString("다양한 사회 문제들을")
                  .pauseFor(200)
                  .typeString("<br/>다양하게 풀어내는 툴킷")
                  .start()
                  .pauseFor(200);
                // .callFunction(function (state) {
                //   state.elements.cursor.style.display = "none";
                // });
              }}
            />
          </div>

          <p className="sm:mt-7 mt-3 text-[#383535] dark:text-white sm:text-[1.4rem] text-[1.1rem] sm:font-normal font-light text-center tracking-tighter">
            다양한 사회 문제들을 다양하게 풀어내는 툴킷,
            <br />
            관심사에 맞게 툴킷을 Pick 하세요!
          </p>
        </div>

        <form
          onSubmit={handleSearchToolkit}
          className="w-full max-w-[760px] relative"
        >
          <input
            onChange={(e) => {
              setText(e.target.value);
            }}
            value={text}
            className="w-full sm:p-8 p-5 box-border mt-4 rounded-full dark:bg-transparent border-[1px] border-solid border-[#79B1FF] outline-none sm:text-[1.2rem] text-[0.9rem] dark:text-white sm:placeholder:text-[1.2rem] placeholder:text-[0.9rem] placeholder:text-[#79B1FF]"
            type="text"
            placeholder="툴킷을 검색하세요."
          />
          <button
            onClick={handleDeleteTitle}
            className={`${
              text.length > 0 ? "opacity-1" : "opacity-0"
            } sm:text-[2.4rem] text-[1.5rem] dark:text-white absolute sm:right-20 right-12 sm:top-[40%] top-[45%] transition-all duration-700`}
            type="button"
          >
            <GoX />
          </button>
          <button
            type="submit"
            className="sm:text-[2.4rem] text-[1.5rem] dark:text-white absolute sm:right-7 right-4 sm:top-[40%] top-[45%]"
          >
            <CiSearch />
          </button>
        </form>

        <ToolkitCategory
          categories={categories}
          categories2={categories2}
          categories3={categories3}
          handleCategoryClick={handleCategoryClick}
          handleCategoryClick2={handleCategoryClick2}
          handleCategoryClick3={handleCategoryClick3}
        />
      </div>

      {isLoading && "Loading..."}
      {error && "An error has occurred...!"}

      <div className="w-full bg-[#c7deff] dark:bg-[#191919]">
        <ul className="w-11/12 max-w-[1400px] mx-auto py-10 sm:grid md:grid-cols-3 sm:grid-cols-2 gap-x-3">
          {searchToolkits.length === 0 &&
            filteredToolkits &&
            filteredToolkits.map((toolkit) => {
              return <ToolkitCard toolkit={toolkit} key={toolkit} />;
            })}

          {searchToolkits.length !== 0 &&
          category === "" &&
          category2 === "" &&
          category3 === "" ? (
            searchToolkits.map((toolkit, index) => {
              return (
                <ToolkitCard toolkit={toolkit} key={toolkit.id} index={index} />
              );
            })
          ) : searchToolkits.length === 0 &&
            category === "" &&
            category2 === "" &&
            category3 === "" ? (
            <p>{errorMessage}</p>
          ) : (
            <></>
          )}
        </ul>
      </div>
    </div>
  );
}
