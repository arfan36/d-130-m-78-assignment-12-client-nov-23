import React from 'react';

const Blog = () => {
    return (
        <div>
            <h2 className="text-3xl text-center mb-8">Blog</h2>
            <div className=''>
                <div tabIndex={0} className="collapse">
                    <div className="collapse-title text-xl font-bold">
                        1. What are the different ways to manage a state in a React application?
                    </div>
                    <div className="collapse-content">
                        <p>The Four Kinds of React State to Manage</p>
                        <p>
                            1. Local state <br />
                            2. Global state <br />
                            3. Server state <br />
                            4. URL state
                        </p>
                    </div>
                </div>
                <div tabIndex={0} className="collapse">
                    <div className="collapse-title text-xl font-bold">
                        2. How does prototypical inheritance work?
                    </div>
                    <div className="collapse-content">
                        <p>The Prototypal Inheritance is a feature in javascript used to add methods and properties in objects. It is a method by which an object can inherit the properties and methods of another object. Traditionally, in order to get and set the [[Prototype]] of an object, we use Object. getPrototypeOf and Object.</p>
                    </div>
                </div>
                <div tabIndex={0} className="collapse">
                    <div className="collapse-title text-xl font-bold">
                        3. What is a unit test? Why should we write unit tests?
                    </div>
                    <div className="collapse-content">
                        <p>Unit Test: Unit Testing is a testing method that tests an individual unit of software in isolation. Unit testing for React Apps means testing an individual React Component. “Unit testing is a great discipline, which can lead to 40% – 80% reductions in bug density.”</p><br />
                        <p>Unit testing is the easiest way to improve the quality of your React applications since it helps in finding bugs and defects in your code. Moreover, the early discovery of code bugs in the SDLC reduces the overall cost of development because less time is spent on bug fixing in the later stage of the project</p>

                    </div>
                </div>
                <div tabIndex={0} className="collapse">
                    <div className="collapse-title text-xl font-bold">
                        4. React vs. Angular vs. Vue?
                    </div>
                    <div className="collapse-content">
                        <p>A simple difference between these three is that React is a UI library, and Vue is a progressive framework. However, Angular is a full-fledged front-end framework. As per StackOverflow Survey 2022, React is the favorite framework of 40.14% of developers, Angular with 22.96%, and Vue with 18.97% of developers.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Blog;