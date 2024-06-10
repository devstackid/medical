import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router, usePage } from "@inertiajs/react";
import { useEffect, useRef, useState } from "react";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);
export default function Dashboard(props) {
    const { errors, auth } = usePage().props;

    const [selectedRange, setSelectedRange] = useState("7days");
    const [chartData, setChartData] = useState([]);
    const [chartLabels, setChartLabels] = useState([]);
    const [chartConsultationData, setChartConsultationData] = useState([]);
    const [chartConsultationLabels, setChartConsultationLabels] = useState([]);
    const [chartPatientData, setChartPatientData] = useState([]);
    const [chartPatientLabels, setChartPatientLabels] = useState([]);
    const chartRef = useRef(null);
    const consultationChartRef = useRef(null);
    const patientChartRef = useRef(null);

    useEffect(() => {
        const fetchData = () => {
            let data;
            let labels;
            

            if (selectedRange === "7days") {
                data = props.doctorsLast7Days.map((item) => item.count);
                labels = generateLast7DaysLabels(props.doctorsLast7Days);
            } else if (selectedRange === "month") {
                data = props.doctorsLastMonth.map((item) => item.count);
                labels = generateLastMonthLabels(props.doctorsLastMonth);
            } else if (selectedRange === "year") {
                data = props.doctorsLastYear.map((item) => item.count);
                labels = generateLastYearLabels(props.doctorsLastYear);

            }

            setChartData(data);
            setChartLabels(labels);
        };

        if (auth.user.role.role === 'admin') {
            fetchData();
        }

    }, [selectedRange, props, auth.user.role.role]);

    useEffect(() => {
        const fetchConsultationData = () => {
            let data;
            let labels; 

            if (selectedRange === "7days") {
                data = props.consultationsLast7Days.map((item) => item.count);
                labels = generateLast7DaysLabels(props.consultationsLast7Days);
            } else if (selectedRange === "month") {
                
                data = props.consultationsLastMonth.map((item) => item.count);
                labels = generateLastMonthLabels(props.consultationsLastMonth);
            } else if (selectedRange === "year") {
                
                data = props.consultationsLastYear.map((item) => item.count);
                labels = generateLastYearLabels(props.consultationsLastYear);

            }

            
            setChartConsultationData(data);
            setChartConsultationLabels(labels);
        };
        if (auth.user.role.role === 'admin') {
            fetchConsultationData();
        }
    }, [selectedRange, props, auth.user.role.role])

    useEffect(() => {
        const fetchPatientData = () => {
            let data;
            let labels;
            

            if (selectedRange === "7days") {
                data = props.patientsLast7Days.map((item) => item.count);
                labels = generateLast7DaysLabels(props.patientsLast7Days);
            } else if (selectedRange === "month") {
                data = props.patientsLastMonth.map((item) => item.count);
                labels = generateLastMonthLabels(props.patientsLastMonth);
            } else if (selectedRange === "year") {
                data = props.patientsLastYear.map((item) => item.count);
                labels = generateLastYearLabels(props.patientsLastYear);

            }

            setChartPatientData(data);
            setChartPatientLabels(labels);
        };

        if (auth.user.role.role === 'admin') {
            fetchPatientData();
        }

    }, [selectedRange, props, auth.user.role.role]);

    useEffect(() => {
        if (chartRef.current) {
            chartRef.current.destroy();
        }

        if (auth.user.role.role === 'admin') {
            const colors = [
                "rgba(254, 0, 87, 0.8)",
                "rgba(96, 39, 255, 0.8)",
                "rgba(255, 185, 39, 0.8)",
                "rgba(39, 255, 136, 0.8)",
            ];

            const backgroundColors = chartData.map(
                (_, index) => colors[index % colors.length]
            );
            const borderColors = chartData.map(
                (_, index) => colors[index % colors.length]
            );

            const ctx = document.getElementById("doctorChart").getContext("2d");
            chartRef.current = new Chart(ctx, {
                type: "bar",
                data: {
                    labels: chartLabels,
                    datasets: [
                        {
                            label: `Total Dokter dalam ${
                                selectedRange === "7days"
                                    ? "7 Hari Terakhir"
                                    : selectedRange === "month"
                                    ? "Satu Bulan Terakhir"
                                    : "Satu Tahun Terakhir"
                            }`,
                            data: chartData,
                            backgroundColor: backgroundColors,
                            borderColor: borderColors,
                            borderWidth: 1,
                            borderRadius: 5,
                            hoverBackgroundColor: "rgba(75, 192, 192, 0.8)",
                        },
                    ],
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            display: true,
                            labels: {
                                color: "#333",
                                font: {
                                    size: 14,
                                    weight: "bold",
                                    family: "Arial, sans-serif",
                                },
                            },
                        },
                        tooltip: {
                            backgroundColor: "rgba(0,0,0,0.7)",
                            titleFont: {
                                size: 14,
                                family: "Arial, sans-serif",
                            },
                            bodyFont: { size: 12, family: "Arial, sans-serif" },
                            padding: 10,
                            cornerRadius: 5,
                        },
                    },
                    scales: {
                        x: {
                            grid: {
                                display: false,
                            },
                            ticks: {
                                color: "#333",
                                font: {
                                    size: 12,
                                    family: "Arial, sans-serif",
                                },
                            },
                        },
                        y: {
                            grid: {
                                color: "rgba(200, 200, 200, 0.3)",
                            },
                            ticks: {
                                beginAtZero: true,
                                color: "#333",
                                font: {
                                    size: 12,
                                    family: "Arial, sans-serif",
                                },
                                callback: function (value) {
                                    if (Number.isInteger(value)) {
                                        return value;
                                    }
                                },
                                stepSize: 1,
                            },
                        },
                    },
                },
            });
        }
    }, [chartData, chartLabels, selectedRange, auth.user.role.role]);

    useEffect(() => {
        if (consultationChartRef.current) {
            consultationChartRef.current.destroy();
        }

        if (auth.user.role.role === 'admin') {
            const colors = [
                "rgba(254, 0, 87, 0.8)",
                "rgba(96, 39, 255, 0.8)",
                "rgba(255, 185, 39, 0.8)",
                "rgba(39, 255, 136, 0.8)",
            ];

            const backgroundColors = chartConsultationData.map(
                (_, index) => colors[index % colors.length]
            );
            const borderColors = chartConsultationData.map(
                (_, index) => colors[index % colors.length]
            );

            const ctx = document.getElementById("consultationChart").getContext("2d");
            consultationChartRef.current = new Chart(ctx, {
                type: "line",
                data: {
                    labels: chartConsultationLabels,
                    datasets: [
                        {
                            label: `Total Konsultasi dalam ${
                                selectedRange === "7days"
                                    ? "7 Hari Terakhir"
                                    : selectedRange === "month"
                                    ? "Satu Bulan Terakhir"
                                    : "Satu Tahun Terakhir"
                            }`,
                            data: chartConsultationData,
                            backgroundColor: backgroundColors,
                            borderColor: borderColors,
                            borderWidth: 1,
                            borderRadius: 5,
                            hoverBackgroundColor: "rgba(75, 192, 192, 0.8)",
                        },
                    ],
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            display: true,
                            labels: {
                                color: "#333",
                                font: {
                                    size: 14,
                                    weight: "bold",
                                    family: "Arial, sans-serif",
                                },
                            },
                        },
                        tooltip: {
                            backgroundColor: "rgba(0,0,0,0.7)",
                            titleFont: {
                                size: 14,
                                family: "Arial, sans-serif",
                            },
                            bodyFont: { size: 12, family: "Arial, sans-serif" },
                            padding: 10,
                            cornerRadius: 5,
                        },
                    },
                    scales: {
                        x: {
                            grid: {
                                display: false,
                            },
                            ticks: {
                                color: "#333",
                                font: {
                                    size: 12,
                                    family: "Arial, sans-serif",
                                },
                            },
                        },
                        y: {
                            grid: {
                                color: "rgba(200, 200, 200, 0.3)",
                            },
                            ticks: {
                                beginAtZero: true,
                                color: "#333",
                                font: {
                                    size: 12,
                                    family: "Arial, sans-serif",
                                },
                                callback: function (value) {
                                    if (Number.isInteger(value)) {
                                        return value;
                                    }
                                },
                                stepSize: 1,
                            },
                        },
                    },
                },
            });
        }
    }, [chartConsultationData, chartConsultationLabels, selectedRange, auth.user.role.role]);

    useEffect(() => {
        if (patientChartRef.current) {
            patientChartRef.current.destroy();
        }

        if (auth.user.role.role === 'admin') {
            const colors = [
                "rgba(254, 0, 87, 0.8)",
                "rgba(96, 39, 255, 0.8)",
                "rgba(255, 185, 39, 0.8)",
                "rgba(39, 255, 136, 0.8)",
            ];

            const backgroundColors = chartPatientData.map(
                (_, index) => colors[index % colors.length]
            );
            const borderColors = chartPatientData.map(
                (_, index) => colors[index % colors.length]
            );

            const ctx = document.getElementById("patientChart").getContext("2d");
            patientChartRef.current = new Chart(ctx, {
                type: "bar",
                data: {
                    labels: chartPatientLabels,
                    datasets: [
                        {
                            label: `Total Pasien dalam ${
                                selectedRange === "7days"
                                    ? "7 Hari Terakhir"
                                    : selectedRange === "month"
                                    ? "Satu Bulan Terakhir"
                                    : "Satu Tahun Terakhir"
                            }`,
                            data: chartPatientData,
                            backgroundColor: backgroundColors,
                            borderColor: borderColors,
                            borderWidth: 1,
                            borderRadius: 5,
                            hoverBackgroundColor: "rgba(75, 192, 192, 0.8)",
                        },
                    ],
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            display: true,
                            labels: {
                                color: "#333",
                                font: {
                                    size: 14,
                                    weight: "bold",
                                    family: "Arial, sans-serif",
                                },
                            },
                        },
                        tooltip: {
                            backgroundColor: "rgba(0,0,0,0.7)",
                            titleFont: {
                                size: 14,
                                family: "Arial, sans-serif",
                            },
                            bodyFont: { size: 12, family: "Arial, sans-serif" },
                            padding: 10,
                            cornerRadius: 5,
                        },
                    },
                    scales: {
                        x: {
                            grid: {
                                display: false,
                            },
                            ticks: {
                                color: "#333",
                                font: {
                                    size: 12,
                                    family: "Arial, sans-serif",
                                },
                            },
                        },
                        y: {
                            grid: {
                                color: "rgba(200, 200, 200, 0.3)",
                            },
                            ticks: {
                                beginAtZero: true,
                                color: "#333",
                                font: {
                                    size: 12,
                                    family: "Arial, sans-serif",
                                },
                                callback: function (value) {
                                    if (Number.isInteger(value)) {
                                        return value;
                                    }
                                },
                                stepSize: 1,
                            },
                        },
                    },
                },
            });
        }
    }, [chartPatientData, chartPatientLabels, selectedRange, auth.user.role.role]);

    const handleRangeChange = (e) => {
        setSelectedRange(e.target.value);
    };

    const generateLast7DaysLabels = (data) => {
        const days = [
            "Minggu",
            "Senin",
            "Selasa",
            "Rabu",
            "Kamis",
            "Jumat",
            "Sabtu",
        ];
        return data.map((item) => {
            const date = new Date(item.date);
            return days[date.getDay()];
        });
    };

    const generateLastMonthLabels = (data) => {
        const now = new Date();
        const daysInMonth = new Date(
            now.getFullYear(),
            now.getMonth() + 1,
            0
        ).getDate();
        return Array.from({ length: daysInMonth }, (_, i) =>
            (i + 1).toString()
        );
    };

    const generateLastYearLabels = (data) => {
        return [
            "Januari",
            "Februari",
            "Maret",
            "April",
            "Mei",
            "Juni",
            "Juli",
            "Agustus",
            "September",
            "Oktober",
            "November",
            "Desember",
        ];
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

                    {auth.user.role.role == 'admin' ? (
                    <div>
                        <div className="flex items-center gap-2">
                            <p className="text-xs font-normal text-black">
                                Sort by
                            </p>
                            <select
                                onChange={handleRangeChange}
                                value={selectedRange}
                                className="mt-3 rounded text-xs"
                            >
                                <option value="7days">7 Hari Terakhir</option>
                                <option value="month">
                                    Satu Bulan Terakhir
                                </option>
                                <option value="year">
                                    Satu Tahun Terakhir
                                </option>
                            </select>
                        </div>

                        <div className="w-full mt-5 grid lg:grid-cols-3 lg:gap-10 gap-3">
                            <div className="grid gap-3">
                                <canvas
                                    id="doctorChart"
                                    className="w-full h-auto"
                                ></canvas>

                                <canvas
                                    id="consultationChart"
                                    className="w-full h-auto"
                                ></canvas>
                            </div>
                            <div className="lg:col-span-2">
                            <canvas
                                    id="patientChart"
                                    className="w-full h-auto"
                                ></canvas>
                            </div>
                        </div>
                    </div>
                    ) :
                    (
                        <div className="mt-10">
                            <h1 className="text-3xl font-black">
                                Selamat Datang di halaman dashboard
                            </h1>
                            
                            <span className="block text-xs font-normal text-black">
                            {auth.user.role.role == 'dokter' ? 'Anda dapat mengelola menjawab keluhan pasien pada halaman data konsultasi' : 'Anda dapat berkonsultasi pada halaman konsultasi dan mengecek riwayat konsultasi'}
                            </span>
                        </div>
                    )
                
                }

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
