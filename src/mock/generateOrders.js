const statuses = ['Pending', 'Shipped', 'Delivered', 'Cancelled'];
const customers = [
  'Aarav Sharma', 'Aditya Verma', 'Ananya', 'Karan Pandey',
  'Aman Singh', 'Ishaan Khattar', 'Vikash', 'Rupesh',
  'Mukesh', 'Rithik', 'parmeet', 'Rahul Dravid',
  'Amarjeet', 'Siddharth', 'Tanvi', 'Vikram ',
  'imran khan', 'vinay', 'Manish', 'Sachin',
  'Saqib', 'Ranbir', 'Pragya', 'Kirti tiwari'
];

export const generateOrders = (count = 2100) => {
  const orders = [];
  const now = new Date();

  for (let i = 1; i <= count; i++) {
    const createdAt = new Date(now.getTime() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000));
    orders.push({
      id: `ORD-${1000 + i}`,
      customerName: customers[Math.floor(Math.random() * customers.length)],
      amount: parseFloat((Math.random() * 4500 + 500).toFixed(2)), // Max 5000
      status: statuses[Math.floor(Math.random() * statuses.length)],
      createdAt: createdAt.toISOString(),
      lastUpdated: createdAt.toISOString(),
    });
  }

  return orders;
};
