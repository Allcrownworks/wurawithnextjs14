"use client"


export default function About () {
  return (
    <main className="bg-yellow-800 p-6 overflow-y-auto">
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      {/* Row 1 */}
      <div className="bg-white p-4 rounded-lg shadow-md md:row-span-2">
        <h3 className="font-bold text-lg mb-2">Card 1</h3>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.</p>
      </div>
      
      <div className="bg-yellow-200 p-4 rounded-lg shadow-md">
        <h3 className="font-bold text-lg mb-2">Card 2</h3>
        <p>Short description here.</p>
      </div>
      
      <div className="bg-green-200 p-4 rounded-lg shadow-md">
        <h3 className="font-bold text-lg mb-2">Card 3</h3>
        <p>Another short description.</p>
      </div>
      
      <div className="bg-blue-200 p-4 rounded-lg shadow-md md:row-span-2">
        <h3 className="font-bold text-lg mb-2">Card 4</h3>
        <p>Medium length description that might wrap to a second line.</p>
      </div>
      
      {/* Row 2 */}
      <div className="bg-purple-200 p-4 rounded-lg shadow-md sm:col-span-2">
        <h3 className="font-bold text-lg mb-2">Wide Card 5</h3>
        <p>This card spans two columns on medium screens and up.</p>
      </div>
      
      {/* Row 3 */}
      <div className="bg-pink-200 p-4 rounded-lg shadow-md">
        <h3 className="font-bold text-lg mb-2">Card 6</h3>
        <p>Simple content</p>
      </div>
      
      <div className="bg-indigo-200 p-4 rounded-lg shadow-md md:col-span-2">
        <h3 className="font-bold text-lg mb-2">Card 7</h3>
        <p>Double width card</p>
      </div>
      
      <div className="bg-orange-200 p-4 rounded-lg shadow-md">
        <h3 className="font-bold text-lg mb-2">Card 8</h3>
        <p>Last card</p>
      </div>
      
      {/* Row 4 */}
      <div className="bg-teal-200 p-4 rounded-lg shadow-md sm:col-span-2 md:col-span-4">
        <h3 className="font-bold text-lg mb-2">Full Width Card</h3>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis laboriosam asperiores nulla deleniti dolores odio possimus unde voluptates eveniet obcaecati minus natus aperiam quae, exercitationem corporis esse, non laudantium maxime dicta? Aspernatur tempore fuga architecto vel deserunt veritatis atque porro illo obcaecati corrupti animi eveniet, a praesentium. Nisi, dolor cumque.</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis laboriosam asperiores nulla deleniti dolores odio possimus unde voluptates eveniet obcaecati minus natus aperiam quae, exercitationem corporis esse, non laudantium maxime dicta? Aspernatur tempore fuga architecto vel deserunt veritatis atque porro illo obcaecati corrupti animi eveniet, a praesentium. Nisi, dolor cumque.</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis laboriosam asperiores nulla deleniti dolores odio possimus unde voluptates eveniet obcaecati minus natus aperiam quae, exercitationem corporis esse, non laudantium maxime dicta? Aspernatur tempore fuga architecto vel deserunt veritatis atque porro illo obcaecati corrupti animi eveniet, a praesentium. Nisi, dolor cumque.</p>
      </div>
    </div>
  </main>
  );
}


