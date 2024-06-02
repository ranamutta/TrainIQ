import { useEffect, useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Chart from './components/Chart';
import Container from './components/Container/index';
import axios from 'axios';
import Loader from './components/Loader';
import Error from './components/Error';
import List from './components/List';
import Card from './components/Card';
import ActivityChart from './components/Chart/ActivityChart';
import EmployeeList from './components/List/EmployeeList';
import Teams from './components/Teams';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    axios
      .get('https://demotrainiq.com/case/dashboard')
      .then((res) => {
        setData(res.data.data);
        setError(null);
      })
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  }, []);

  const cards = [
    {
      label: 'Avarage Employee Score',
      value: data?.average_employee_score,
    },
    {
      label: 'Total Completed Courses',
      value: data?.total_completed_courses,
    },
    {
      label: 'Total Employees',
      value: data?.total_employees,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col text-white">
      <Header />

      <main className="bg-zinc-800 flex-1">
        <Container>
          {isLoading ? (
            <Loader />
          ) : error ? (
            <Error message={err} />
          ) : (
            data && (
              <div className="flex flex-col gap-12">
                <div className="flex gap-5 md:gap-10">
                  {cards.map((i, key) => (
                    <Card item={i} key={key} />
                  ))}
                </div>

                <div className="grid grid-cols-5 max-lg:grid-cols-1 gap-10">
                  <div className="">
                    <EmployeeList employees={data.top_employees} />
                  </div>

                  <div className="lg:col-span-4">
                    <ActivityChart data={data.activity_hours} />
                  </div>
                </div>

                <List
                  title="Upcoming Courses"
                  courses={data.upcoming_courses}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <Chart
                    title="Skills In Development"
                    data={data.skills_in_development}
                  />
                  <Chart title="Top Skills" data={data.top_skills} />
                </div>

                <List
                  title="In Progress Courses"
                  courses={data.in_progress_courses}
                />

                <Teams data={data.teams} />
              </div>
            )
          )}
        </Container>
      </main>

      <Footer />
    </div>
  );
};

export default App;
