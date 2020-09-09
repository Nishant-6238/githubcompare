import React, {useState,useEffect} from 'react';
import logo from './logo.svg';
import { Form, Input,Card,Avatar} from 'antd';
import './App.css';
import { UserOutlined,AudioOutlined} from '@ant-design/icons';
const { Meta } = Card;

const { Search } = Input;
  const onFinish = values => {
    console.log('Success:', values);
  };
const onFinishFailed = errorInfo => {
  console.log('Failed:', errorInfo);
};
const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: '#1890ff',
    }}
  />
);

function App() {
  const [name,setName]=useState('');
  const [userName, setUsername]=useState('');
  const [followers, setFollowers]=useState('');
  const [following, setFollowing]=useState('');
  const [repos, setRepos]=useState('');
  const [avatar,setAvatar ]=useState('');
  const [userInput, setUserInput]=useState('');
  const [error, setError]=useState(null);

  useEffect(()=>{
    fetch('https://api.github.com/users/vabhishek-me')
    .then(res=>res.json())
    .then(data=> {
      setData(data);
    });
  }, []);

  const setData=({
    name,
     login,
      followers,
       following,
        public_repos,
         avatar_url
       })=>{
   setName(name);
   setUsername(login);
   setFollowers(followers);
   setFollowing(following);
   setRepos(public_repos);
   setAvatar(avatar_url );
       };

       const handleSearch=(e)=>{
         setUsername(e.target.value)
        }

        const handleSubmit = ()=>{
          fetch('https://api.github.com/users/${userName}')
          .then(res=>res.json())
          .then(data=>{
            if (data.message){
              setError(data.message)
            }
            else{
              setData(data);
              setError(null)
            }

          });
        };

  return (
    <div>
      <div className='navbar'>Github Profile Search </div>
    <div className='search'>
      <Form 
      
      name="basic"
      initialValues={{
        remember: true,
      }}
      onSubmit ={handleSubmit}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      onChange={handleSearch}
    >
     <Search
      placeholder="Enter Github username"
      enterButton="Search"
      size="large"
      suffix={suffix}
      onSearch={value => console.log(value)}
    />
    </Form>
    </div>
    {error ? (<h1>{error}</h1>
    ):(
      <div className='card'>
      <Card
      hoverable
      style={{ width: 300 }}
      cover={<img alt="example" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
    >
      
      <Meta title="name"/>
      <Meta title="login"/>
      <div>
        <a>
        <Avatar size="small" icon={<UserOutlined />} />
         {followers} followers
      </a>
     </div>
     <div>
        <a>
        <Avatar size="small" icon={<UserOutlined />} />
         {following} following
      </a>
     </div>
     <div>
        <a>
        <Avatar size="small" icon={<UserOutlined />} />
        {repos} Repos
      </a>
     </div>
    </Card>
      </div>
    )}
    
    </div>
  );
}

export default App;
