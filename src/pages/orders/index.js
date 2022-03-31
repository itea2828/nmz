
// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import axios from 'axios';
import BASE_URL from 'utils/baseUrl';
// Data
import authorsTableData from "layouts/tables/data/authorsTableData";
import projectsTableData from "layouts/tables/data/projectsTableData";
import { useEffect, useState } from "react";

import Moment from 'react-moment';
import moment from 'moment';
import 'moment/locale/ru';


function Orders() {
  
  const { columns: pColumns, rows: pRows } = projectsTableData();

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const [orders, setOrders] = useState([])

  // Orders /////// //////////////////////
  const getOrders = async () => {
    const token = localStorage.getItem("token")

    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    try {
        setLoading(true)
        const response = await axios.get(`${BASE_URL}orders/list/`, config)
        .then(res => {
            const orders = res.data;
            console.log(`orders =`, orders)
            setOrders(orders)
            setLoading(false)
            setErrors(null)
        })
    } catch (error) {
        setLoading(false)
        setOrders([])
        setErrors(error.message)
        console.log(`error data =`, error)
    }
  }

  useEffect(() => {
    getOrders();
  }, [])


  // console.log('orders', orders)

  const { columns, rows } = authorsTableData();

  const DisplayData=orders.map(
    (o)=>{
        return(
            <tr>
               
                <td><MDTypography display="block" variant="caption" color="text" fontWeight="medium">
                <Moment format="DD/MM/YYYY HH:mm">{o.createdAt}</Moment>
                </MDTypography>
                </td>

                <td style={{paddingLeft: '20px'}}><MDTypography style={{color: 'green'}} display="block" variant="caption" color="text" fontWeight="medium">
                  {o.totalPrice} тг
                </MDTypography>
                </td>
                <td style={{paddingLeft: '20px'}}><MDTypography display="block" variant="caption" color="text" fontWeight="medium">
                    {o.city}
                  </MDTypography>
                </td>
                <td style={{paddingLeft: '20px', width: '200px'}}><MDTypography display="block" variant="caption" color="text" fontWeight="medium">
                    {o.user?.name}
                  </MDTypography>
                </td>
                <td style={{paddingLeft: '20px'}}>
                  <p>{o.isPaid === true? <p style={{color: 'green', fontSize: '13px'}}>Оплачен</p>: <p style={{color: 'orange', fontSize: '13px'}}>Не оплачен</p>}</p>
                </td>
                <td style={{paddingLeft: '20px'}}>
                  <MDTypography component="a" href={'billing/' + o._id} variant="caption" style={{color: 'blue'}} fontWeight="medium">
                    Подробно
                  </MDTypography>
                </td>
            </tr>
        )
    }
)

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Заказы
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                {/* <DataTable
                  table={{ columns, rows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />  */}
                <div style={{paddingLeft: '10px', paddingRight: '10px'}}>
                  <table class="table table-striped">
                      <thead>
                        <tr>
                          <th style={{width: '200px', textAlign: 'left', fontSize: '13px'}} >Дата заказа</th>
                          <th style={{textAlign: 'left', fontSize: '13px', paddingLeft: '20px'}}>Цена</th>
                          <th style={{textAlign: 'left', fontSize: '13px', paddingLeft: '20px'}}>Город</th>
                          <th style={{textAlign: 'left', fontSize: '13px', paddingLeft: '20px', width: '200px'}}>Пользователь</th>
                          <th style={{textAlign: 'left', fontSize: '13px', paddingLeft: '20px'}}>Статус</th>
                          <th style={{textAlign: 'left', fontSize: '13px', paddingLeft: '20px'}}>Подробно</th>
                        
                        </tr>
                      </thead>
                      <tbody>
                      
                          
                          {DisplayData}
                          
                      </tbody>
                  </table>
                  
                </div>
              </MDBox>
            </Card>
          </Grid>

          {/* <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Projects Table
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns: pColumns, rows: pRows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid> */}
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Orders;
