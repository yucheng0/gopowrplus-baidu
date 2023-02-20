import { Select, Row,Col } from 'antd';
const handleChange = (value) => {
  console.log(`selected ${value}`);
};
const App = () =>{
return (
    <>
  <Row justify='center'>
    <Col 
    xs = {16} sm = {6} md = {8}  lg={6} style={{padding:'3px 10px 0px 10px', backgroundColor:"black"}}>
   加侖及公升變換的時間(s)
    </Col>

    <Col > 
    <Select
      defaultValue="10s"
      style={{
        width: 120,
      }}
      onChange={handleChange}
      options={[
        {
          value: '1s',
          label: '1s',
        },
        {
          value: '2s',
          label: '2s',
        },
        {
          value: '3s',
          label: '3s',
        },
        {
          value: '4s',
          label: '4s',
        },
        {
            value: '5s',
            label: '5s',
          },
          {
            value: '6s',
            label: '6s',
          },
          {
            value: '7s',
            label: '7s',
          },
          {
            value: '8s',
            label: '8s',
          },
          {
            value: '9s',
            label: '9s',
          },
          {
              value: '10s',
              label: '10s',
            },
            {
                value: '11s',
                label: '11s',
              },
              {
                value: '12s',
                label: '12s',
              },
              {
                value: '13s',
                label: '13s',
              },
              {
                value: '14s',
                label: '14s',
              },
              {
                value: '15s',
                label: '15s',
              },
              {
                value: '16s',
                label: '16s',
              },
              {
                value: '17s',
                label: '17s',
              },
    
              {
                value: '18s',
                label: '18s',
              },
              {
                value: '19s',
                label: '19s',
              },

              {
                value: '20s',
                label: '20s',
              },
      ]}
    />
   
  </Col>
  </Row>

  <Row justify='center'>
  <Col  xs = {16} sm = {6} md = {8} lg={6}  style={{padding:'3px 10px 0px 10px', backgroundColor:"black"}}>
   日/周/月變換的時間(s)
    </Col>
    <Col> 
    <Select
      defaultValue="10s"
      style={{
        width: 120,
      }}
      onChange={handleChange}
      options={[
        {
          value: '1s',
          label: '1s',
        },
        {
          value: '2s',
          label: '2s',
        },
        {
          value: '3s',
          label: '3s',
        },
        {
          value: '4s',
          label: '4s',
        },
        {
            value: '5s',
            label: '5s',
          },
          {
            value: '6s',
            label: '6s',
          },
          {
            value: '7s',
            label: '7s',
          },
          {
            value: '8s',
            label: '8s',
          },
          {
            value: '9s',
            label: '9s',
          },
          {
              value: '10s',
              label: '10s',
            },
            {
                value: '11s',
                label: '11s',
              },
              {
                value: '12s',
                label: '12s',
              },
              {
                value: '13s',
                label: '13s',
              },
              {
                value: '14s',
                label: '14s',
              },
              {
                value: '15s',
                label: '15s',
              },
              {
                value: '16s',
                label: '16s',
              },
              {
                value: '17s',
                label: '17s',
              },
    
              {
                value: '18s',
                label: '18s',
              },
              {
                value: '19s',
                label: '19s',
              },

              {
                value: '20s',
                label: '20s',
              },
      ]}
    />
   
  </Col>
  </Row>

  </>

);
    }
export default App;