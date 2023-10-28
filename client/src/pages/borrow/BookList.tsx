import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Card } from "antd";
import { ToastContainer, toast } from "react-toastify";
import type { ColumnsType } from "antd/es/table";
import { Link, useParams } from "react-router-dom";

type ListBook = {
  code: string;
  title: string;
  author: string;
  stock: number;
};

const BookList: React.FC = () => {
  const [books, setBooks] = useState<ListBook[]>();
  const { valueMember } = useParams();

  const getBooks = async () => {
    try {
      const response = await axios.get("http://localhost:9000/api/books");
      setBooks(response.data.data);
    } catch (error: any) {
      console.log(error.response.data.message);
    }
  };

  useEffect(() => {
    getBooks();
  }, []);

  const handleClick = async (record: ListBook) => {
    try {
      const response = await axios.post(
        `http://localhost:9000/api/borrow/${valueMember}/${record.code}`
      );

      toast(response.data.message, {
        autoClose: 2000,
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

  const columns: ColumnsType<ListBook> = [
    {
      title: "Code",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Author",
      dataIndex: "author",
      key: "author",
    },
    {
      title: "Stock",
      dataIndex: "stock",
      key: "stock",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button onClick={() => handleClick(record)}>Borrow</Button>
      ),
    },
  ];

  return (
    <>
      <h2 className="heading">Book List</h2>
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
        <Table dataSource={books} columns={columns} />
      </Card>
    </>
  );
};

export default BookList;
