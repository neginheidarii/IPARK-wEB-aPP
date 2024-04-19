import { redirect } from 'next/navigation'


const Page = () => {
  return redirect('/dashboard/admin/ticket/panel')

  return (
    <>
      <h3 >Welcome, Admin!</h3>
      <h1>{role} </h1>
    </>
  );
};

export default Page;
