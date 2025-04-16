// "use client"
// import type React from "react"

// import { useRef, useState, useEffect } from "react"
// import { Home, ZoomIn, ZoomOut, SearchIcon, Printer, Menu } from "lucide-react"
// import { Area, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ComposedChart, Legend } from "recharts"

// export default function DataChart() {
//   // Original data for the chart
//   const [data, setData] = useState([
//     { name: "Jan 03", orders: 1.4, payments: 1.0, highlighted: false },
//     { name: "Jan 06", orders: 2.0, payments: 3.0, highlighted: false },
//     { name: "Jan 09", orders: 2.5, payments: 3.5, highlighted: false },
//     { name: "Jan 12", orders: 1.5, payments: 4.0, highlighted: false },
//     { name: "Jan 15", orders: 2.4, payments: 4.2, highlighted: false },
//     { name: "Jan 18", orders: 2.7, payments: 4.8, highlighted: false },
//     { name: "Jan 21", orders: 3.8, payments: 6.5, highlighted: false },
//     { name: "Jan 27", orders: 4.5, payments: 8.2, highlighted: false },
//   ])

//   const [showSearch, setShowSearch] = useState(false)
//   const [searchTerm, setSearchTerm] = useState("")
//   const [showMenu, setShowMenu] = useState(false)
//   const [searchResults, setSearchResults] = useState<number[]>([])

//   // Zoom state
//   const [zoomDomain, setZoomDomain] = useState<{
//     x: [number, number]
//     y1: [number, number]
//     y2: [number, number]
//   }>({
//     x: [0, data.length - 1],
//     y1: [0, 5],
//     y2: [0, 10],
//   })

//   // Panning state
//   const [isPanning, setIsPanning] = useState(false)
//   const [startPanPosition, setStartPanPosition] = useState({ x: 0, y: 0 })
//   const [startDomain, setStartDomain] = useState(zoomDomain)

//   const chartRef = useRef<HTMLDivElement>(null)
//   const chartContainerRef = useRef<HTMLDivElement | null>(null) as React.MutableRefObject<HTMLDivElement | null>

//   // Add mouse wheel zoom functionality
//   useEffect(() => {
//     const handleWheel = (e: WheelEvent) => {
//       if (!chartContainerRef.current) return

//       // Prevent default scrolling behavior
//       e.preventDefault()

//       // Get the current zoom domain
//       const currentXRange = zoomDomain.x[1] - zoomDomain.x[0]
//       const currentY1Range = zoomDomain.y1[1] - zoomDomain.y1[0]
//       const currentY2Range = zoomDomain.y2[1] - zoomDomain.y2[0]

//       // Calculate zoom factor based on wheel delta
//       // Negative delta means zoom in, positive means zoom out
//       const zoomFactor = e.deltaY > 0 ? 0.1 : -0.1

//       // Get mouse position relative to chart container
//       const rect = chartContainerRef.current.getBoundingClientRect()
//       const mouseX = (e.clientX - rect.left) / rect.width

//       // Calculate new domain values
//       let newXMin, newXMax, newY1Min, newY1Max, newY2Min, newY2Max

//       if (zoomFactor < 0) {
//         // Zoom in
//         newXMin = zoomDomain.x[0] + currentXRange * Math.abs(zoomFactor) * mouseX
//         newXMax = zoomDomain.x[1] - currentXRange * Math.abs(zoomFactor) * (1 - mouseX)
//         newY1Min = zoomDomain.y1[0] + currentY1Range * Math.abs(zoomFactor) * 0.5
//         newY1Max = zoomDomain.y1[1] - currentY1Range * Math.abs(zoomFactor) * 0.5
//         newY2Min = zoomDomain.y2[0] + currentY2Range * Math.abs(zoomFactor) * 0.5
//         newY2Max = zoomDomain.y2[1] - currentY2Range * Math.abs(zoomFactor) * 0.5
//       } else {
//         // Zoom out
//         newXMin = Math.max(0, zoomDomain.x[0] - currentXRange * zoomFactor * mouseX)
//         newXMax = Math.min(data.length - 1, zoomDomain.x[1] + currentXRange * zoomFactor * (1 - mouseX))
//         newY1Min = Math.max(0, zoomDomain.y1[0] - currentY1Range * zoomFactor * 0.5)
//         newY1Max = Math.min(5, zoomDomain.y1[1] + currentY1Range * zoomFactor * 0.5)
//         newY2Min = Math.max(0, zoomDomain.y2[0] - currentY2Range * zoomFactor * 0.5)
//         newY2Max = Math.min(10, zoomDomain.y2[1] + currentY2Range * zoomFactor * 0.5)
//       }

//       // Ensure minimum zoom range
//       if (newXMax - newXMin < 0.5) return
//       if (newY1Max - newY1Min < 0.5) return
//       if (newY2Max - newY2Min < 0.5) return

//       // Update zoom domain
//       setZoomDomain({
//         x: [newXMin, newXMax],
//         y1: [newY1Min, newY1Max],
//         y2: [newY2Min, newY2Max],
//       })
//     }

//     // Add event listener
//     const chartContainer = chartContainerRef.current
//     if (chartContainer) {
//       chartContainer.addEventListener("wheel", handleWheel, { passive: false })
//     }

//     // Cleanup
//     return () => {
//       if (chartContainer) {
//         chartContainer.removeEventListener("wheel", handleWheel)
//       }
//     }
//   }, [zoomDomain, data.length])

//   // Add panning functionality
//   useEffect(() => {
//     const handleMouseDown = (e: MouseEvent) => {
//       if (!chartContainerRef.current) return

//       // Start panning
//       setIsPanning(true)
//       setStartPanPosition({ x: e.clientX, y: e.clientY })
//       setStartDomain({ ...zoomDomain })

//       // Change cursor
//       document.body.style.cursor = "grabbing"
//     }

//     const handleMouseMove = (e: MouseEvent) => {
//       if (!isPanning || !chartContainerRef.current) return

//       // Calculate movement delta
//       const deltaX = e.clientX - startPanPosition.x
//       const deltaY = e.clientY - startPanPosition.y

//       // Get container dimensions
//       const rect = chartContainerRef.current.getBoundingClientRect()

//       // Calculate domain movement based on delta
//       // Negative deltaX means move right, positive means move left
//       const xRatio = deltaX / rect.width
//       const yRatio = deltaY / rect.height

//       const xRange = startDomain.x[1] - startDomain.x[0]
//       const y1Range = startDomain.y1[1] - startDomain.y1[0]
//       const y2Range = startDomain.y2[1] - startDomain.y2[0]

//       // Calculate new domain values
//       let newXMin = startDomain.x[0] - xRatio * xRange
//       let newXMax = startDomain.x[1] - xRatio * xRange
//       let newY1Min = startDomain.y1[0] + yRatio * y1Range
//       let newY1Max = startDomain.y1[1] + yRatio * y1Range
//       let newY2Min = startDomain.y2[0] + yRatio * y2Range
//       let newY2Max = startDomain.y2[1] + yRatio * y2Range

//       // Ensure we don't pan beyond data boundaries
//       if (newXMin < 0) {
//         newXMin = 0
//         newXMax = xRange
//       }

//       if (newXMax > data.length - 1) {
//         newXMax = data.length - 1
//         newXMin = newXMax - xRange
//       }

//       if (newY1Min < 0) {
//         newY1Min = 0
//         newY1Max = y1Range
//       }

//       if (newY1Max > 5) {
//         newY1Max = 5
//         newY1Min = newY1Max - y1Range
//       }

//       if (newY2Min < 0) {
//         newY2Min = 0
//         newY2Max = y2Range
//       }

//       if (newY2Max > 10) {
//         newY2Max = 10
//         newY2Min = newY2Max - y2Range
//       }

//       // Update zoom domain
//       setZoomDomain({
//         x: [newXMin, newXMax],
//         y1: [newY1Min, newY1Max],
//         y2: [newY2Min, newY2Max],
//       })
//     }

//     const handleMouseUp = () => {
//       // End panning
//       setIsPanning(false)

//       // Reset cursor
//       document.body.style.cursor = "default"
//     }

//     // Add event listeners
//     const chartContainer = chartContainerRef.current
//     if (chartContainer) {
//       chartContainer.addEventListener("mousedown", handleMouseDown)
//       document.addEventListener("mousemove", handleMouseMove)
//       document.addEventListener("mouseup", handleMouseUp)
//     }

//     // Cleanup
//     return () => {
//       if (chartContainer) {
//         chartContainer.removeEventListener("mousedown", handleMouseDown)
//       }
//       document.removeEventListener("mousemove", handleMouseMove)
//       document.removeEventListener("mouseup", handleMouseUp)
//     }
//   }, [isPanning, startPanPosition, startDomain, zoomDomain, data.length])

//   // Function to handle zoom in
//   const handleZoomIn = () => {
//     const currentXRange = zoomDomain.x[1] - zoomDomain.x[0]
//     const currentY1Range = zoomDomain.y1[1] - zoomDomain.y1[0]
//     const currentY2Range = zoomDomain.y2[1] - zoomDomain.y2[0]

//     // Zoom in by 20%
//     const newXMin = zoomDomain.x[0] + currentXRange * 0.1
//     const newXMax = zoomDomain.x[1] - currentXRange * 0.1
//     const newY1Min = zoomDomain.y1[0] + currentY1Range * 0.1
//     const newY1Max = zoomDomain.y1[1] - currentY1Range * 0.1
//     const newY2Min = zoomDomain.y2[0] + currentY2Range * 0.1
//     const newY2Max = zoomDomain.y2[1] - currentY2Range * 0.1

//     // Ensure minimum zoom range
//     if (newXMax - newXMin < 0.5) return
//     if (newY1Max - newY1Min < 0.5) return
//     if (newY2Max - newY2Min < 0.5) return

//     setZoomDomain({
//       x: [newXMin, newXMax],
//       y1: [newY1Min, newY1Max],
//       y2: [newY2Min, newY2Max],
//     })
//   }

//   // Function to handle zoom out
//   const handleZoomOut = () => {
//     const currentXRange = zoomDomain.x[1] - zoomDomain.x[0]
//     const currentY1Range = zoomDomain.y1[1] - zoomDomain.y1[0]
//     const currentY2Range = zoomDomain.y2[1] - zoomDomain.y2[0]

//     // Zoom out by 20%
//     const newXMin = Math.max(0, zoomDomain.x[0] - currentXRange * 0.1)
//     const newXMax = Math.min(data.length - 1, zoomDomain.x[1] + currentXRange * 0.1)
//     const newY1Min = Math.max(0, zoomDomain.y1[0] - currentY1Range * 0.1)
//     const newY1Max = Math.min(5, zoomDomain.y1[1] + currentY1Range * 0.1)
//     const newY2Min = Math.max(0, zoomDomain.y2[0] - currentY2Range * 0.1)
//     const newY2Max = Math.min(10, zoomDomain.y2[1] + currentY2Range * 0.1)

//     setZoomDomain({
//       x: [newXMin, newXMax],
//       y1: [newY1Min, newY1Max],
//       y2: [newY2Min, newY2Max],
//     })
//   }

//   // Function to handle search
//   const handleSearch = () => {
//     setShowSearch(!showSearch)
//     if (!showSearch) {
//       setSearchTerm("")
//       setSearchResults([])
//       resetHighlights()
//     } else {
//       resetHighlights()
//     }
//   }

//   // Function to reset highlights
//   const resetHighlights = () => {
//     setData(data.map((item) => ({ ...item, highlighted: false })))
//   }

//   // Function to apply search
//   const applySearch = () => {
//     if (!searchTerm) return

//     // Reset previous highlights
//     const newData = [...data].map((item) => ({ ...item, highlighted: false }))

//     // Find all matching indices
//     const matchingIndices = data
//       .map((item, index) => (item.name.toLowerCase().includes(searchTerm.toLowerCase()) ? index : -1))
//       .filter((index) => index !== -1)

//     setSearchResults(matchingIndices)

//     if (matchingIndices.length > 0) {
//       // Highlight matching items
//       matchingIndices.forEach((index) => {
//         if (index >= 0 && index < newData.length) {
//           newData[index].highlighted = true
//         }
//       })

//       setData(newData)

//       // If only one result, adjust zoom to focus on it
//       if (matchingIndices.length === 1) {
//         const index = matchingIndices[0]
//         setZoomDomain({
//           ...zoomDomain,
//           x: [Math.max(0, index - 1), Math.min(data.length - 1, index + 1)],
//         })
//       }
//     }
//   }

//   // Function to handle search input keydown
//   const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === "Enter") {
//       applySearch()
//     }
//   }

//   // Function to handle print
//   const handlePrint = () => {
//     if (!chartRef.current) return

//     // Use html2canvas or a similar library to capture the chart
//     // For simplicity, we'll just open a window with the chart data
//     const printWindow = window.open("", "_blank")
//     if (printWindow) {
//       printWindow.document.write(`
//         <html>
//           <head>
//             <title>Chart Print</title>
//             <style>
//               body { margin: 0; padding: 20px; font-family: Arial, sans-serif; }
//               table { border-collapse: collapse; width: 100%; }
//               th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
//               th { background-color: #f2f2f2; }
//               h2 { color: #333; }
//             </style>
//           </head>
//           <body>
//             <h2>Chart Data</h2>
//             <table>
//               <tr>
//                 <th>Date</th>
//                 <th>Number of orders</th>
//                 <th>Payments</th>
//               </tr>
//               ${data
//                 .map(
//                   (item) => `
//                 <tr>
//                   <td>${item.name}</td>
//                   <td>${item.orders}</td>
//                   <td>${item.payments}</td>
//                 </tr>
//               `,
//                 )
//                 .join("")}
//             </table>
//             <script>
//               setTimeout(() => {
//                 window.print();
//                 window.close();
//               }, 500);
//             </script>
//           </body>
//         </html>
//       `)
//       printWindow.document.close()
//     }
//   }

//   // Function to handle home (reset)
//   const handleHome = () => {
//     // Reset zoom
//     setZoomDomain({
//       x: [0, data.length - 1],
//       y1: [0, 5],
//       y2: [0, 10],
//     })

//     // Reset highlights
//     resetHighlights()

//     // Reset search
//     setShowSearch(false)
//     setSearchTerm("")
//     setSearchResults([])
//     setShowMenu(false)
//   }

//   // Function to toggle menu
//   const handleMenu = () => {
//     setShowMenu(!showMenu)
//   }

//   // Custom tooltip component
//      // eslint-disable-next-line @typescript-eslint/no-explicit-any

//   const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: any[]; label?: string }) => {
//     if (active && payload && payload.length) {
//       return (
//         <div className="bg-white p-2 border border-gray-200 shadow-md rounded-md">
//           <p className="text-sm font-medium">{label}</p>
//           <p className="text-sm text-gray-600">
//             <span className="inline-block w-3 h-3 bg-[#7fe0ed] mr-1 rounded-full"></span>
//             Orders: {payload[0].value}
//           </p>
//           <p className="text-sm text-gray-600">
//             <span className="inline-block w-3 h-3 bg-[#007bff] mr-1 rounded-full"></span>
//             Payments: {payload[1].value}
//           </p>
//         </div>
//       )
//     }
//     return null
//   }

//   // Calculate visible data based on zoom domain
//   const visibleData = data.slice(Math.floor(zoomDomain.x[0]), Math.ceil(zoomDomain.x[1]) + 1)

//   return (
//     <div className="w-full max-w-4xl mx-auto p-4">
//       <div className="flex justify-end gap-2 mb-4 relative ">
//         <button className="p-1.5 rounded-full hover:bg-gray-100" onClick={handleZoomIn} title="Zoom In">
//           <ZoomIn className="w-4 h-4 text-gray-500" />
//         </button>
//         <button className="p-1.5 rounded-full hover:bg-gray-100" onClick={handleZoomOut} title="Zoom Out">
//           <ZoomOut className="w-4 h-4 text-gray-500" />
//         </button>
//         <button
//           className={`p-1.5 rounded-full hover:bg-gray-100 ${showSearch ? "bg-gray-200" : ""}`}
//           onClick={handleSearch}
//           title="Search"
//         >
//           <SearchIcon className="w-5 h-5 text-gray-600" strokeWidth={2} />
//         </button>
//         <button className="p-1.5 rounded-full hover:bg-gray-100" onClick={handlePrint} title="Print">
//           <Printer className="w-4 h-4 text-gray-500" />
//         </button>
//         <button className="p-1.5 rounded-full hover:bg-gray-100" onClick={handleHome} title="Reset">
//           <Home className="w-4 h-4 text-gray-500" />
//         </button>
//         <button
//           className={`p-1.5 rounded-full hover:bg-gray-100 ${showMenu ? "bg-gray-200" : ""}`}
//           onClick={handleMenu}
//           title="Menu"
//         >
//           <Menu className="w-4 h-4 text-gray-500" />
//         </button>

//         {/* Search input */}
//         {showSearch && (
//           <div className="absolute right-0 top-10 bg-white shadow-md rounded-md p-2 z-10 flex">
//             <div className="relative flex items-center">
//               <SearchIcon className="w-4 h-4 text-gray-400 absolute left-2" />
//               <input
//                 type="text"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 onKeyDown={handleSearchKeyDown}
//                 placeholder="Search date (e.g. Jan 15)"
//                 className="border rounded pl-8 pr-2 py-1 text-sm w-48"
//                 autoFocus
//               />
//             </div>
//             <button
//               onClick={applySearch}
//               className="ml-2 bg-blue-500 text-white px-2 py-1 rounded text-sm flex items-center"
//             >
//               <SearchIcon className="w-3 h-3 mr-1" />
//               Search
//             </button>
//           </div>
//         )}

//         {/* Search results indicator */}
//         {searchResults.length > 0 && (
//           <div className="absolute right-0 top-[4.5rem] bg-white shadow-md rounded-md p-2 z-10">
//             <p className="text-xs text-gray-600">
//               Found {searchResults.length} result{searchResults.length !== 1 ? "s" : ""}
//             </p>
//           </div>
//         )}

//         {/* Menu dropdown */}
//         {showMenu && (
//           <div className="absolute right-0 top-10 bg-white shadow-md rounded-md p-2 z-10 w-40">
//             <ul className="text-sm">
//               <li className="p-1.5 hover:bg-gray-100 cursor-pointer rounded">Download PNG</li>
//               <li className="p-1.5 hover:bg-gray-100 cursor-pointer rounded">Download CSV</li>
//               <li className="p-1.5 hover:bg-gray-100 cursor-pointer rounded">View Full Screen</li>
//               <li className="p-1.5 hover:bg-gray-100 cursor-pointer rounded">Share Chart</li>
//             </ul>
//           </div>
//         )}
//       </div>
//       <div
//         className={`h-[300px] relative ${isPanning ? "cursor-grabbing" : "cursor-grab"}`}
//         ref={(el) => {
//           (chartRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
//           chartContainerRef.current = el;
//         }}
//       >
//         <ResponsiveContainer width="100%" height="100%">
//           <ComposedChart data={visibleData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
//             <CartesianGrid strokeDasharray="3 3" vertical={false} />
//             <XAxis dataKey="name" domain={["auto", "auto"]} tick={{ fontSize: 12 }} />
//             <YAxis
//               yAxisId="left"
//               domain={[zoomDomain.y1[0], zoomDomain.y1[1]]}
//               tick={{ fontSize: 12 }}
//               tickFormatter={(value) => value.toFixed(1)}
//               tickCount={6}
//               stroke="#36A2EB"
//             />
//             <YAxis
//               yAxisId="right"
//               orientation="right"
//               domain={[zoomDomain.y2[0], zoomDomain.y2[1]]}
//               tick={{ fontSize: 12 }}
//               tickFormatter={(value) => value.toFixed(1)}
//               tickCount={6}
//               stroke="#36A2EB"
//             />
//             <Tooltip content={<CustomTooltip />} />
//             <Legend
//               wrapperStyle={{
//                 paddingTop: 10,
//                 fontSize: 12,
//               }}
//               payload={[
//                 { value: "Number of orders", type: "rect", color: "#7fe0ed" },
//                 { value: "Payments", type: "rect", color: "#007bff" },
//               ]}
//             />
//             <Bar
//               yAxisId="left"
//               dataKey="orders"
//               name="Number of orders"
//               fill="#7fe0ed"
//               radius={[2, 2, 0, 0]}
//               fillOpacity={0.8}
//               // Apply highlighting
//               isAnimationActive={false}
//                  // eslint-disable-next-line @typescript-eslint/no-explicit-any

//               shape={(props: any) => {
//                 const { x, y, width, height, index } = props
//                 const isHighlighted = data[index + Math.floor(zoomDomain.x[0])]?.highlighted
//                 return (
//                   <rect
//                     x={x}
//                     y={y}
//                     width={width}
//                     height={height}
//                     fill={isHighlighted ? "rgba(255, 99, 132, 0.8)" : "#7fe0ed"}
//                     fillOpacity={0.8}
//                     rx={2}
//                     ry={2}
//                   />
//                 )
//               }}
//             />
//             <Area
//               yAxisId="right"
//               dataKey="payments"
//               name="Payments"
//               type="monotone"
//               fill="#007bff"
//               fillOpacity={0.2}
//               stroke="#007bff"
//               strokeWidth={2}
//               // Apply highlighting
//               isAnimationActive={false}
//               activeDot={{ r: 6 }}
//                  // eslint-disable-next-line @typescript-eslint/no-explicit-any

//               dot={(props: any) => {
//                 const { cx, cy, index } = props
//                 const isHighlighted = data[index + Math.floor(zoomDomain.x[0])]?.highlighted
//                 return (
//                   <circle
//                     cx={cx}
//                     cy={cy}
//                     r={4}
//                     fill={isHighlighted ? "rgba(255, 99, 132, 1)" : "#007bff"}
//                     stroke={isHighlighted ? "rgba(255, 99, 132, 1)" : "#007bff"}
//                   />
//                 )
//               }}
//             />
//           </ComposedChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   )
// }


"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { Home, ZoomIn, ZoomOut, Printer, Menu, SearchIcon } from "lucide-react"
import Chart from "chart.js/auto"
import zoomPlugin from "chartjs-plugin-zoom"
import { Chart as ChartJS, registerables } from "chart.js"

// Register Chart.js components
ChartJS.register(...registerables, zoomPlugin)

export default function DataChart() {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstance = useRef<Chart | null>(null)
  const [showSearch, setShowSearch] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [showMenu, setShowMenu] = useState(false)
  const [searchResults, setSearchResults] = useState<number[]>([])

  // Original data for the chart
  const labels = ["Jan 03", "Jan 06", "Jan 09", "Jan 12", "Jan 15", "Jan 18", "Jan 21", "Jan 27"]
  const orderData = [1.4, 2.0, 2.5, 1.5, 2.4, 2.7, 3.8, 4.5]
  const paymentData = [1.0, 3.0, 3.5, 4.0, 4.2, 4.8, 6.5, 8.2]

  const initializeChart = () => {
    if (!chartRef.current) return

    // Destroy existing chart instance if it exists
    if (chartInstance.current) {
      chartInstance.current.destroy()
    }

    const ctx = chartRef.current.getContext("2d")
    if (!ctx) return

    // Create the chart
    chartInstance.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Number of orders",
            data: orderData,
            backgroundColor: "rgba(127, 224, 237, 0.6)",
            borderColor: "rgba(127, 224, 237, 1)",
            borderWidth: 1,
            borderRadius: 2,
            order: 1,
          },
          {
            label: "Payments",
            data: paymentData,
            type: "line",
            borderColor: "rgba(0, 123, 255, 1)",
            backgroundColor: "rgba(0, 123, 255, 0.2)", // More opacity for area fill
            borderWidth: 2,
            pointRadius: 3,
            pointBackgroundColor: "rgba(0, 123, 255, 1)",
            yAxisID: "y1",
            tension: 0.4,
            fill: true, // Enable area fill
            order: 0,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            grid: {
              display: false,
            },
          },
          y: {
            beginAtZero: true,
            max: 5.0,
            position: "left",
            title: {
              display: true,
              color: "#36A2EB",
              font: {
                size: 12,
              },
            },
            ticks: {
              color: "#36A2EB",
              callback: (value) => (typeof value === "number" ? value.toFixed(1) : value),
            },
            grid: {
              color: "rgba(0, 0, 0, 0.05)",
            },
          },
          y1: {
            beginAtZero: true,
            max: 10.0,
            position: "right",
            title: {
              display: true,
              color: "#36A2EB",
              font: {
                size: 12,
              },
            },
            ticks: {
              color: "#36A2EB",
              callback: (value) => (typeof value === "number" ? value.toFixed(1) : value),
            },
            grid: {
              display: false,
            },
          },
        },
        plugins: {
          legend: {
            display: true,
            position: "bottom",
            labels: {
              usePointStyle: true,
              boxWidth: 8,
            },
          },
          tooltip: {
            mode: "index",
            intersect: false,
          },
          zoom: {
            pan: {
              enabled: true,
              mode: "xy",
            },
            zoom: {
              wheel: {
                enabled: true, // Enable mouse wheel zooming
              },
              pinch: {
                enabled: true,
              },
              mode: "xy",
              scaleMode: "xy",
            },
            limits: {
              y: { min: 0, max: 5, minRange: 1 },
              y1: { min: 0, max: 10, minRange: 2 },
            },
          },
        },
      },
    })
  }

  useEffect(() => {
    initializeChart()

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
    }
  }, [])

  // Function to handle zoom in
  const handleZoomIn = () => {
    if (!chartInstance.current) return

    const chart = chartInstance.current

    // Get the current min/max values for each axis
    const xAxis = chart.scales.x
    const yAxis = chart.scales.y
    const y1Axis = chart.scales.y1

    // Calculate new ranges (zoom in by 10%)
    const xRange = xAxis.max - xAxis.min
    const yRange = yAxis.max - yAxis.min
    const y1Range = y1Axis.max - y1Axis.min

    const newXMin = xAxis.min + xRange * 0.1
    const newXMax = xAxis.max - xRange * 0.1
    const newYMin = yAxis.min + yRange * 0.1
    const newYMax = yAxis.max - yRange * 0.1
    const newY1Min = y1Axis.min + y1Range * 0.1
    const newY1Max = y1Axis.max - y1Range * 0.1

    // Apply the zoom
    chart.zoomScale("x", { min: newXMin, max: newXMax }, "default")
    chart.zoomScale("y", { min: newYMin, max: newYMax }, "default")
    chart.zoomScale("y1", { min: newY1Min, max: newY1Max }, "default")

    chart.update()
  }

  // Function to handle zoom out
  const handleZoomOut = () => {
    if (!chartInstance.current) return

    const chart = chartInstance.current

    // Get the current min/max values for each axis
    const xAxis = chart.scales.x
    const yAxis = chart.scales.y
    const y1Axis = chart.scales.y1

    // Calculate new ranges (zoom out by 10%)
    const xRange = xAxis.max - xAxis.min
    const yRange = yAxis.max - yAxis.min
    const y1Range = y1Axis.max - y1Axis.min

    const newXMin = Math.max(0, xAxis.min - xRange * 0.1)
    const newXMax = Math.min(labels.length - 1, xAxis.max + xRange * 0.1)
    const newYMin = Math.max(0, yAxis.min - yRange * 0.1)
    const newYMax = Math.min(5.0, yAxis.max + yRange * 0.1)
    const newY1Min = Math.max(0, y1Axis.min - y1Range * 0.1)
    const newY1Max = Math.min(10.0, y1Axis.max + y1Range * 0.1)

    // Apply the zoom
    chart.zoomScale("x", { min: newXMin, max: newXMax }, "default")
    chart.zoomScale("y", { min: newYMin, max: newYMax }, "default")
    chart.zoomScale("y1", { min: newY1Min, max: newY1Max }, "default")

    chart.update()
  }

  // Function to handle search
  const handleSearch = () => {
    setShowSearch(!showSearch)
    if (!showSearch) {
      setSearchTerm("")
      setSearchResults([])
    } else {
      // If closing search, reset highlights
      resetHighlights()
    }
  }

  // Function to reset highlights
  const resetHighlights = () => {
    if (!chartInstance.current) return

    const chart = chartInstance.current
    const meta0 = chart.getDatasetMeta(0)
    const meta1 = chart.getDatasetMeta(1)

    // Reset all elements
    meta0.data.forEach((element) => {
      element.options.backgroundColor = "rgba(127, 224, 237, 0.6)"
    })

    meta1.data.forEach((element) => {
      element.options.borderColor = "rgba(0, 123, 255, 1)"
      element.options.backgroundColor = "rgba(0, 123, 255, 0.2)"
    })

    chart.update()
  }

  // Function to apply search
  const applySearch = () => {
    if (!chartInstance.current || !searchTerm) return

    // Reset previous highlights
    resetHighlights()

    const chart = chartInstance.current

    // Find all matching indices
    const matchingIndices = labels
      .map((label, index) => (label.toLowerCase().includes(searchTerm.toLowerCase()) ? index : -1))
      .filter((index) => index !== -1)

    setSearchResults(matchingIndices)

    if (matchingIndices.length > 0) {
      const meta0 = chart.getDatasetMeta(0)
      const meta1 = chart.getDatasetMeta(1)

      // Highlight all matching elements
      matchingIndices.forEach((index) => {
        if (meta0.data[index]) {
          meta0.data[index].options.backgroundColor = "rgba(255, 99, 132, 0.8)"
        }

        if (meta1.data[index]) {
          meta1.data[index].options.borderColor = "rgba(255, 99, 132, 1)"
          meta1.data[index].options.backgroundColor = "rgba(255, 99, 132, 0.3)"
        }
      })

      chart.update()

      // Focus on the first result by zooming to it
      if (matchingIndices.length === 1) {
        const index = matchingIndices[0]
        // Zoom to focus on the found data point
        chart.zoomScale("x", { min: Math.max(0, index - 1), max: Math.min(labels.length - 1, index + 1) }, "default")
        chart.update()
      }
    }
  }

  // Function to handle search input keydown
  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      applySearch()
    }
  }

  // Function to handle print
  const handlePrint = () => {
    if (!chartInstance.current) return

    const canvas = chartInstance.current.canvas
    const dataUrl = canvas.toDataURL("image/png")

    const printWindow = window.open("", "_blank")
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Chart Print</title>
            <style>
              body { margin: 0; display: flex; justify-content: center; align-items: center; height: 100vh; }
              img { max-width: 100%; max-height: 100%; }
              @media print {
                body { margin: 0; padding: 0; }
              }
            </style>
          </head>
          <body>
            <img src="${dataUrl}" />
            <script>
              setTimeout(() => {
                window.print();
                window.close();
              }, 500);
            </script>
          </body>
        </html>
      `)
      printWindow.document.close()
    }
  }

  // Function to handle home (reset)
  const handleHome = () => {
    if (!chartInstance.current) return

    // Reset zoom using the plugin's resetZoom method
    chartInstance.current.resetZoom()

    // Reset data highlights
    resetHighlights()

    // Reset search
    setShowSearch(false)
    setSearchTerm("")
    setSearchResults([])
    setShowMenu(false)
  }

  // Function to toggle menu
  const handleMenu = () => {
    setShowMenu(!showMenu)
  }

  return (
    <div className="w-full max-w-4xl mx-auto bg-white p-4 rounded-lg shadow-sm">
      <div className="flex justify-end gap-2 mb-4 relative">
        <button className="p-1.5 rounded-full hover:bg-gray-100" onClick={handleZoomIn} title="Zoom In">
          <ZoomIn className="w-4 h-4 text-gray-500" />
        </button>
        <button className="p-1.5 rounded-full hover:bg-gray-100" onClick={handleZoomOut} title="Zoom Out">
          <ZoomOut className="w-4 h-4 text-gray-500" />
        </button>
        <button
          className={`p-1.5 rounded-full hover:bg-gray-100 ${showSearch ? "bg-gray-200" : ""}`}
          onClick={handleSearch}
          title="Search"
        >
          {/* Explicitly using SearchIcon (magnifier) with increased size for visibility */}
          <SearchIcon className="w-5 h-5 text-gray-600" strokeWidth={2} />
        </button>
        <button className="p-1.5 rounded-full hover:bg-gray-100" onClick={handlePrint} title="Print">
          <Printer className="w-4 h-4 text-gray-500" />
        </button>
        <button className="p-1.5 rounded-full hover:bg-gray-100" onClick={handleHome} title="Reset">
          <Home className="w-4 h-4 text-gray-500" />
        </button>
        <button
          className={`p-1.5 rounded-full hover:bg-gray-100 ${showMenu ? "bg-gray-200" : ""}`}
          onClick={handleMenu}
          title="Menu"
        >
          <Menu className="w-4 h-4 text-gray-500" />
        </button>

        {/* Search input */}
        {showSearch && (
          <div className="absolute right-0 top-10 bg-white shadow-md rounded-md p-2 z-10 flex">
            <div className="relative flex items-center">
              <SearchIcon className="w-4 h-4 text-gray-400 absolute left-2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleSearchKeyDown}
                placeholder="Search date (e.g. Jan 15)"
                className="border rounded pl-8 pr-2 py-1 text-sm w-48"
                autoFocus
              />
            </div>
            <button
              onClick={applySearch}
              className="ml-2 bg-blue-500 text-white px-2 py-1 rounded text-sm flex items-center"
            >
              <SearchIcon className="w-3 h-3 mr-1" />
              Search
            </button>
          </div>
        )}

        {/* Search results indicator */}
        {searchResults.length > 0 && (
          <div className="absolute right-0 top-[4.5rem] bg-white shadow-md rounded-md p-2 z-10">
            <p className="text-xs text-gray-600">
              Found {searchResults.length} result{searchResults.length !== 1 ? "s" : ""}
            </p>
          </div>
        )}

        {/* Menu dropdown */}
        {showMenu && (
          <div className="absolute right-0 top-10 bg-white shadow-md rounded-md p-2 z-10 w-40">
            <ul className="text-sm">
              <li className="p-1.5 hover:bg-gray-100 cursor-pointer rounded">Download PNG</li>
              <li className="p-1.5 hover:bg-gray-100 cursor-pointer rounded">Download CSV</li>
              <li className="p-1.5 hover:bg-gray-100 cursor-pointer rounded">View Full Screen</li>
              <li className="p-1.5 hover:bg-gray-100 cursor-pointer rounded">Share Chart</li>
            </ul>
          </div>
        )}
      </div>
      <div className="h-[300px] relative">
        <canvas ref={chartRef}></canvas>
      </div>
      <div className="flex items-center justify-start gap-6 mt-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#7fe0ed]"></div>
          <span className="text-sm text-gray-700">Number of orders</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#007bff]"></div>
          <span className="text-sm text-gray-700">Payments</span>
        </div>
      </div>
    </div>
  )
}

