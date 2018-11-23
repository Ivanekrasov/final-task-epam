import React from 'react';

export default () => {
    return (
       <div>
           <table className="table table-striped">
               <thead>
               <tr>
                   <th scope="col">#</th>
                   <th scope="col">Service</th>
                   <th scope="col">Price</th>
                   <th scope="col">Time needed</th>
               </tr>
               </thead>
               <tbody>
               <tr>
                   <th scope="row">1</th>
                   <td>Shaving</td>
                   <td>15$</td>
                   <td>~1 hour</td>
               </tr>
               <tr>
                   <th scope="row">3</th>
                   <td>Haircut</td>
                   <td>20$</td>
                   <td>~1.5 hour</td>
               </tr>
               <tr>
                   <th scope="row">2</th>
                   <td>Jagermeister</td>
                   <td>5$</td>
                   <td>anytime ;)</td>
               </tr>
               </tbody>
           </table>
       </div>
    );
};
