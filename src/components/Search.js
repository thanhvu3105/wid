
import React, { useState, useEffect} from 'react';
import axios from 'axios';


//DOMPurify is a DOM-only sanitizer for HTML. prevents XSS attack
const createDOMPurify = require("dompurify");
const { JSDOM } = require('jsdom');

const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window);




const Search = () => {


    const [term, setTerm] = useState('');
    const [debouncedTerm, setDebouncedTerm] = useState(term);
    const [results, setResults] = useState([]);

    useEffect( () => {
        const timerId = setTimeout(() =>{
            setDebouncedTerm(term);
        },1000);

        return () => {
            clearTimeout(timerId);
        };
    }, [term]);

    useEffect( () => {

        
    }, [debouncedTerm]);

    

    //need to tell when useEffect executed
    //second argument of useEffect control when useEffect is executed
    //There will always be an array on the second argument

//  can't put ⬇️  async here
    useEffect (() => {
        //API request   
        const searchData = async () => {
            const { data } = await axios.get("https://en.wikipedia.org/w/api.php", 
            {
                params: {
                    action: "query",
                    list : "search",
                    origin : "*",
                    format: "json",
                    srsearch: term,
                },
            });
         
            
            //now search = result
            //if we want to access pageid, do result.pageid(    )
            setResults(data.query.search);

        };

        
        //show result when there's a term on search bar but no result appears
        if(term && !results.length) 
        {
            searchData();
        }

        else{
            //Set time for a search for 500 ms
            const timeout = setTimeout(() => {
                if(term)
                {
                    searchData();
                }

            }, 500);    


            //cancel previous timeout
            return () => {
                clearTimeout(timeout);
            };
        }
    }, [term,results.length]);


 

    //mapping
    //should never put componentDidMount() in function component
    const renderedResults = results.map((result) => {
        
       
        return (
            <div key={result.pageid} className="item">
                <div className="right floated content">
                    <a className="ui button" href={`https://en.wikipedia.org?curid=${result.pageid}`}>Click</a>
                </div>
                <div className="content">
                    <div className="header">
                        {result.title}
                    </div> 
                    <span dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(result.snippet), }} ></span>
                    
                </div>
            </div>
        );
    });

    


    return (
        <div>
            <div className = "ui form">
                <div className = "field">
                    <label>Enter Search Term</label>
                    <input 
                        type="text" placeholder="Search..."
                        value = {term}
                        onChange = { (event) => setTerm(event.target.value)}
                        className="input"
                    ></input>
                </div>
            </div>
            <div className="ui celled list">
                {renderedResults};
            </div>
        </div>

    );
};


export default Search;