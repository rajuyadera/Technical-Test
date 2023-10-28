import React, { useEffect, useState } from "react";
import { Button, Select } from "antd";
import axios from "axios";
import { Link } from "react-router-dom";

const Option = Select.Option;

type Member = {
  code: string;
  name: string;
  books: [];
};

type ValueOption = {
  value: string;
  label: React.ReactNode;
};

const Home: React.FC = () => {
  const [members, setMembers] = useState<Member[] | null>();
  const [valueMember, setValueMember] = useState<ValueOption>();

  const getMember = async () => {
    try {
      const response = await axios.get("http://localhost:9000/api/members");
      setMembers(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMember();
  }, []);

  const handleChange = (value: ValueOption) => {
    setValueMember(value);
    console.log();
  };

  return (
    <>
      <h1 className="heading">Welcome to library</h1>

      <Select
        value={valueMember}
        className=" w-2/5 rounded-3xl"
        onChange={handleChange}
        placeholder="Choose first who wants to borrow the book"
      >
        {members
          ? members.map((member) => (
              <Option value={member.code} key={member.code}>
                {member.name}
              </Option>
            ))
          : null}
      </Select>

      <div className="flex gap-4">
        {valueMember === undefined ? (
          <Button disabled className="bg-white mt-5">Borrow</Button>
        ) : (
          <Link to={`/booklist/${valueMember}`}>
            <Button className="bg-white mt-5">Borrow</Button>
          </Link>
        )}
        <Link to={`/member`}>
          <Button className="bg-white mt-5">Member</Button>
        </Link>
      </div>
    </>
  );
};

export default Home;
