import React, {useState, useEffect, useCallback, useRef} from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";
import "./Search.css";
import { BiChevronDown, BiSolidCity} from "react-icons/bi";

export default function Home() {
  
  const resultSectionRef = useRef(null);
  const [search, setSearch] = useState('');
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);
  
  const loadData=async()=>{
    let response = await fetch("http://localhost:4000/api/foodData",{
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      }
    });
    response=await response.json();

    // console.log(response[0], response[1]);

    setFoodItem(response[0]);
    setFoodCat(response[1]);

  };

  useEffect(()=>{
    loadData();
  },[])

  const img = {
    height: "100vh",
    width: "30rem"
  };
  const hm={
    display: "flex",
    height: "100vh",
    width: "99.5vh"
  };
  const srch={
    width: "100rem",
    display: "flex",
    flexWrap: 'wrap',
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: "#464646"
  };
  const frm={
    width:"35rem",
    display: "flex",
    justifyContent: "center",
    marginBottom: "2px"
  };
  const textArray = [
    'Hungry?',
    'Late from work?',
    'Need to relax?',
    'Cooking gone wrong?',
    'House party?',
  ];
  const [displayText, setDisplayText] = useState(textArray[0]);
  const [animationClass, setAnimationClass] = useState('scrolling-text');

  const updateText = useCallback(() => {
    setAnimationClass('scrolling-text-exit');
    setTimeout(() => {
      setDisplayText(textArray[(textArray.indexOf(displayText) + 1) % textArray.length]);
      setAnimationClass('scrolling-text-enter');
    }, 500);
  }, [displayText, textArray]);

  useEffect(() => {
    const timer = setInterval(updateText, 2000);

    return () => {
      clearInterval(timer);
    };
  }, [updateText]);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (resultSectionRef.current) {
        resultSectionRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleHover = () => {
    document.getElementById("card").style.boxShadow =
      "10px 10px 10px #888888";
  };

  const handleUnhover = () => {
    document.getElementById("card").style.boxShadow = "5px 5px 5px #888888";
  };

  let itemsFound = false;

  return (
    <div style={{"backgroundColor":"#ffffff"}}>
      <div>
        <Navbar />
      </div>
      <div style={hm}>
      <div className="fortune-machine" style={srch}>
        <div className={`fortune-text ${animationClass}`} style={{}}><h1>{displayText}</h1></div>
        <div><h5 style={{"color":"#ff7800", "padding":"0px 60px", "marginBottom":"30px"}}>Order good food from favourite restraunts near you</h5></div>
        <div>
        <div className="form-inline" style={frm}>
          <input
            className="form-control mr-sm-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
            style={{"width":"28rem"}}
            value={search}
            onChange={(e)=>{setSearch(e.target.value)}}
            onKeyPress={handleKeyPress}
          />
        </div>
          <div style={{ fontSize: '1.2rem', textAlign:"center"}}>Search or <h7 style={{"color":"#ff7800"}}> swipe down </h7>to explore</div>
          <div className="swipe-icon" style={{ fontSize: '1.2rem', textAlign:"center", marginBottom:"90px" }}><BiChevronDown/></div>
        </div>
        <div style={{"marginBottom":"10px", "padding": "0px 60px"}}><h5>POPULAR CITIES IN INDIA <BiSolidCity/></h5></div>
        <div style={{"marginBottom":"10px", "padding": "0px 60px"}}><h7> Delhi  </h7><h7 style={{"color":"#ff7800"}}> Mumbai  </h7><h7> Lucknow  </h7><h7 style={{"color":"#ff7800"}}> Kolkata  </h7><h7> Ahmedabad  </h7><h7 style={{"color":"#ff7800"}}> & more...</h7>
        </div>
      </div>
      <img
        src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,h_1340/Lunch1_vlksgq"
        className="d-block w-100"
        alt="..."
        style={img}
      />
    </div>
    <div calssName="container" style={{ color: "black" }} ref={resultSectionRef}>
  {
    foodCat !== [] ?
      foodCat.map((data) => {
        const filteredItems = foodItem.filter((item) => (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(search.toLocaleLowerCase())));

        if (filteredItems.length > 0) {
          itemsFound = true;
        }

        return (
          <div key={data._id}>
            {filteredItems.length > 0 && (
              <div style={{ textAlign: "center", marginTop: "3rem", fontFamily: "sans-serif", fontSize: "2rem" }}>{data.CategoryName}</div>
            )}
            <hr />
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: "center" }}>
              {
                filteredItems.map(filterItems => (
                  <div key={filterItems._id}>
                    <Card
                      foodItem={filterItems}
                      onMouseEnter={handleHover}
                      onMouseLeave={handleUnhover}
                      style={{boxShadow: "5px 5px 5px",
                      transition: "box-shadow 0.3s",}}
                    />
                  </div>
                ))
              }
              {!itemsFound && <div style={{ color: "black", display: "grid", placeItems: "center"}}>Not found!</div>}
              
            </div>
          </div>
        );
      })
      : ""
  }
</div>

      <div>
        <Footer />
      </div>
    </div>
  );
}
