import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router, usePage } from "@inertiajs/react";
import { useEffect, useRef, useState } from "react";
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);
export default function Dashboard(props) {
    const { errors } = usePage().props;

    const [selectedRange, setSelectedRange] = useState('7days');
    const [chartData, setChartData] = useState([]);
    const [chartLabels, setChartLabels] = useState([]);
    const chartRef = useRef(null);

    useEffect(() => {
        const fetchData = () => {
            let data;
            let labels;

            if (selectedRange === '7days') {
                data = props.doctorsLast7Days.map(item => item.count);
                labels = generateLast7DaysLabels(props.doctorsLast7Days);
            } else if (selectedRange === 'month') {
                data = props.doctorsLastMonth.map(item => item.count);
                labels = generateLastMonthLabels(props.doctorsLastMonth);
            } else if (selectedRange === 'year') {
                data = props.doctorsLastYear.map(item => item.count);
                labels = generateLastYearLabels(props.doctorsLastYear);
            }

            setChartData(data);
            setChartLabels(labels);
        };

        fetchData();
    }, [selectedRange, props]);

    useEffect(() => {
        if (chartRef.current) {
            chartRef.current.destroy();
        }

        const ctx = document.getElementById('doctorChart').getContext('2d');
        chartRef.current = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: chartLabels,
                datasets: [{
                    label: `Total Dokter dalam ${selectedRange === '7days' ? '7 Hari Terakhir' : selectedRange === 'month' ? 'Satu Bulan Terakhir' : 'Satu Tahun Terakhir'}`,
                    data: chartData,
                    backgroundColor: 'rgba(75, 192, 192, 0.6)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                    borderRadius: 5,
                    hoverBackgroundColor: 'rgba(75, 192, 192, 0.8)',
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: true,
                        labels: {
                            color: '#333',
                            font: {
                                size: 14,
                                weight: 'bold',
                                family: 'Arial, sans-serif'
                            }
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0,0,0,0.7)',
                        titleFont: { size: 14, family: 'Arial, sans-serif' },
                        bodyFont: { size: 12, family: 'Arial, sans-serif' },
                        padding: 10,
                        cornerRadius: 5,
                    }
                },
                scales: {
                    x: {
                        grid: {
                            display: false,
                        },
                        ticks: {
                            color: '#333',
                            font: {
                                size: 12,
                                family: 'Arial, sans-serif'
                            }
                        }
                    },
                    y: {
                        grid: {
                            color: 'rgba(200, 200, 200, 0.3)',
                        },
                        ticks: {
                            beginAtZero: true,
                            color: '#333',
                            font: {
                                size: 12,
                                family: 'Arial, sans-serif'
                            },
                            callback: function(value) {
                                if (Number.isInteger(value)) {
                                    return value;
                                }
                            },
                            stepSize: 1
                        }
                    }
                }
            }
        });
    }, [chartData, chartLabels, selectedRange]);

    const handleRangeChange = (e) => {
        setSelectedRange(e.target.value);
    };

    const generateLast7DaysLabels = (data) => {
        const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
        return data.map(item => {
            const date = new Date(item.date);
            return days[date.getDay()];
        });
    };

    const generateLastMonthLabels = (data) => {
        const now = new Date();
        const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
        return Array.from({ length: daysInMonth }, (_, i) => (i + 1).toString());
    };

    const generateLastYearLabels = (data) => {
        return ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
    };
    
    

    

    return (
        <AuthenticatedLayout
            user={props.auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto px-3 lg:px-8">
                    <h1 className="text-sm font-bold text-black">
                        Dashboard{" "}
                        <span className="block text-slate-700 font-normal">
                            Pengelolaan data
                        </span>
                    </h1>

                    <div>
            <select onChange={handleRangeChange} value={selectedRange}>
                <option value="7days">7 Hari Terakhir</option>
                <option value="month">Satu Bulan Terakhir</option>
                <option value="year">Satu Tahun Terakhir</option>
            </select>
            <canvas id="doctorChart" width="400" height="200"></canvas>
        </div>
                    
                </div>
            </div>

            
        </AuthenticatedLayout>
    );
}
