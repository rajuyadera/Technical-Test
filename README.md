# Technical Test

## Study Case
* [Study Case](https://github.com/eigen3dev/fullstack-test-case)

## Requirements

- [ ]  Node version 18 +
- [ ]  XAMPP

### Installation

1. Clone the repo 
```sh
git clone https://github.com/rajuyadera/Technical-Test.git
```
2. Create database mysql with name "testcase"
3. Make sure XAMPP is Running
4. Install module with npm install in folder client and api
```sh
cd api
npm install

cd client
npm install
```
5. Run api with "npm run start" or start using nodemon "npm run dev
```sh
cd api
npm run start / npm run dev
```
6. If the API is running perfectly, and the table in the database has been created, insert the following data according to the table
 ### Mock Data

- Books

```tsx
[
    {
        code: "JK-45",
        memberCode : null,
        title: "Harry Potter",
        author: "J.K Rowling",
        stock: 1
    },
    {
        code: "SHR-1",
        memberCode : null,
        title: "A Study in Scarlet",
        author: "Arthur Conan Doyle",
        stock: 1
    },
    {
        code: "TW-11",
        memberCode : null,
        title: "Twilight",
        author: "Stephenie Meyer",
        stock: 1
    },
    {
        code: "HOB-83",
        memberCode : null,
        title: "The Hobbit, or There and Back Again",
        author: "J.R.R. Tolkien",
        stock: 1
    },
    {
        code: "NRN-7",
        memberCode : null,
        title: "The Lion, the Witch and the Wardrobe",
        author: "C.S. Lewis",
        stock: 1
    },
]
```

- Members

```tsx
[
    {
        code: "M001",
        name: "Angga",
    },
    {
        code: "M002",
        name: "Ferry",
    },
    {
        code: "M003",
        name: "Putri",
    },
]
```
  
7. Run frontend with "npm run dev"
```sh
cd client
npm run dev
```

## Contact
if error or problem with this repository contact me
 - whatsapp : 083899790773
 - email : rajuyaderaa@gmail.com
