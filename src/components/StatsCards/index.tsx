const StatsCards = () => {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
      {[
        { title: 'Total Users', value: '1,250' },
        { title: 'Trips Completed', value: '980' },
        { title: 'Plus Members', value: '320' },
        { title: 'Revenue', value: '$12,400' },
      ].map((stat) => (
        <div
          key={stat.title}
          className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow flex flex-col items-start"
        >
          <p className="text-gray-500 dark:text-gray-400 text-sm">{stat.title}</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
        </div>
      ))}
    </section>
  );
};

export default StatsCards;
