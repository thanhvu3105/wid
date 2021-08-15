import React, { useState } from 'react';



const Accordion = ( {items}) => {
    //not an array, it's a destructor, useState set to activeIndex,

    //         state     update state              initial value of this piece of state
    const [activeIndex, setActiveIndex] = useState(null);   
    //another example
    //const [color, setcolor] = useState("green");

    //equivalent(but much better than)
    //const things = useState(null);
    //const activeIndex = things[0]
    //const setActiveIndex = things[1]

    
    const onTitleClick = (index) => {
        setActiveIndex(index);
    }


    const renderedItems = items.map( (item,index) => {

      //  console.log(items);


        const active = index === activeIndex ? 'active' : '';

          //React fragment return multiple elements
        return <React.Fragment key={item.title}>
            <div 
                /* title active will display the content, without active, content is hide, will be trigered by click  */
                className={`title ${active}`}
                //On click trigger the click, index is a unit when you click.
                onClick={() => onTitleClick(index)}
            >
                <i className="dropdown icon"></i>
                {item.title}
            </div>
            <div className={`content ${active}`}>
                <p>
                    {item.content}
                </p>
            </div>
        </React.Fragment>
    })


    return <div className="ui styled fluid accordion"> {renderedItems} </div>;
};


export default Accordion;