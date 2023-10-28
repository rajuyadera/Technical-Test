import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Card } from "antd";
import { ToastContainer, toast } from "react-toastify";
import type { ColumnsType } from "antd/es/table";
import { Link, useParams } from "react-router-dom";



type Books = {
    code: string,
    title: string,
    author: string
}

type ListMember = {
  code: string;
  name: string;
  books: Books[]
};

const MemberList: React.FC = () => {
  const [members, setMembers] = useState<ListMember[]>();
  const { valueMember } = useParams();

  const getBooks = async () => {
    try {
      const response = await axios.get("http://localhost:9000/api/members");
      setMembers(response.data.data);
      console.log(members)
    } catch (error: any) {
      console.log(error.response.data.message);
    }
  };

  useEffect(() => {
    getBooks();
  }, []);

  const handleClick = async (record: ListMember, book: Books) => {
    try {
      const response = await axios.post(
        `http://localhost:9000/api/return/${record.code}/${book.code}`
      );

      toast(response.data.message, {
        autoClose: 3000,
        onClose: refreshPage,
      });
    } catch (error: any) {
      toast(error.response.data.message, {
        autoClose: 3000,
      });
    }
  };

  const refreshPage = () => {
    setTimeout(() => {
      window.location.reload();
    }, 3000);
  };

  const columns: ColumnsType<ListMember> = [
    {
      title: "Code",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Books",
      dataIndex: "books",
      key: "books",
      render: (books: Books[]) => books.map((book, index) =>`${index + 1}. ${book.title} (${book.author})`).join(' & ')
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button onClick={() => handleClick(record, record.books[0] )}>Return</Button>
      ),
    },
  ];

  return (
    <>
      <h2 className="heading">Member List</h2>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="dark"
      />
      <Card bordered={false} color="blue" className="mt-5">
        <Link to={`/`}>
          <Button className="bg-blue-600 text-white">Home</Button>
        </Link>
        <Table<ListMember> dataSource={members} columns={columns} />
      </Card>
    </>
  );
};

export default MemberList;
