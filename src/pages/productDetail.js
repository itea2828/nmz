
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
import axios from 'axios';
import BASE_URL from 'utils/baseUrl';
import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import { Button } from 'react-bootstrap';
import SimpleBlogCard from "examples/Cards/BlogCards/SimpleBlogCard";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import { useNavigate } from "react-router-dom";
import Select from 'react-select';


function ProductDetail() {
  
    const navigate = useNavigate();
    const params = useParams();

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState(null);
    const [order, setOrder] = useState({})


    const [title, setTitle] = useState('')
    const [price, setPrice] = useState()
    const [image, setImage] = useState('')
    const [newImg, setNewImg] = useState(null)
    const [mainImage, setMainImage] = useState(null)
    const [category, setCategory] = useState()
    const [subcategory, setSubcategory] = useState()
    const [diametre, setDiametre] = useState('')
    const [age, setAge] = useState('')
    const [isHit, setIsHit] = useState(false)
    const [isSpeciale, setIsSpeciale] = useState(false)
    const [isAvailable, setIsAvailable] = useState(false)
    const [country, setCountry] = useState('')
    const [description, setDescription] = useState('')


  // Orders /////// //////////////////////
  const getOrder = async () => {
    const token = localStorage.getItem("token")

    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    try {
        setLoading(true)
        const response = await axios.get(`${BASE_URL}products/${params.id}/`, config)
        .then(res => {
            const o = res.data;
            // console.log(`orders =`, orders)
            setOrder(o)
            setTitle(o.title)
            setPrice(o.price)
            setAge(o.age)
            setCategory(o.category)
            setSubcategory(o.subcategory)
            setCountry(o.country)
            setDescription(o.description)
            setDiametre(o.diametre)
            setImage(o.image)
            setIsHit(o.isHit)
            setIsSpeciale(o.isSpeciale)
            setIsAvailable(o.isAvailable)

            setLoading(false)
            setErrors(null)
        })
    } catch (error) {
        setLoading(false)
        setOrder({})
        setErrors(error.message)
        console.log(`error data =`, error)
    }
  }

  const [categories, setCategories] = useState([])
  const [fcategories, setFcategories] = useState([])
  const getCategory = async () => {
    const token = localStorage.getItem("token")

    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    try {
        setLoading(true)
        const response = await axios.get(`${BASE_URL}categories/list/`, config)
        .then(res => {
            const o = res.data;
            // console.log(`orders =`, orders)
            setCategories(o)
            setFcategories(o)
            setLoading(false)
            setErrors(null)
        })
    } catch (error) {
        setLoading(false)
        setCategories([])
        setFcategories([])
        setErrors(error.message)
        console.log(`error data =`, error)
    }
  }

//   const getSubCategory = async () => {
//     const token = localStorage.getItem("token")

//     const config = {
//         headers: { Authorization: `Bearer ${token}` }
//     };
//     try {
//         setLoading(true)
//         const response = await axios.get(`${BASE_URL}subcategories/list/`, config)
//         .then(res => {
//             const o = res.data;
//             console.log(`sub res.data =`, o)
//             // setCategories(o)
//             setFcategories(o)
//             setLoading(false)
//             setErrors(null)
//         })
//     } catch (error) {
//         setLoading(false)
//         // setCategories([])
//         setFcategories([])
//         setErrors(error.message)
//         console.log(`error data =`, error)
//     }
//   }

  useEffect(() => {
    getOrder();
    getCategory();
    // getSubCategory();
  }, [])

    const options = categories

    const [selectedCategory, setSelectedCategory] = useState(null);
    const [findedCat, setFindedCat] = useState({})

    console.log('selectedCategory', selectedCategory)

    useEffect(() => {
        if(selectedCategory != null || selectedCategory != 'null'){
            const filtered = fcategories?.filter((i) => i.title === selectedCategory)
            setFcategories(filtered)
            
            function findCherries(category) { 
                return category.title === selectedCategory;
            }
            const result = filtered?.find(findCherries); 
            setFindedCat(result)
            // console.log('result', result)
              
        }

        if (selectedCategory === null || selectedCategory === 'null') {
            setSelectedSubCategory(null)
            setFcategories(categories)
        }
      
    }, [selectedCategory])
    
  
    // console.log('fcategories', fcategories)


    const suboptions = fcategories

    const [selectedSubCategory, setSelectedSubCategory] = useState(null);

    const onIsHit = () => {
        setIsHit(!isHit);
    };

    const onIsSpeciale = () => {
        setIsSpeciale(!isSpeciale);
    };

    const onIsAvailable = () => {
        setIsAvailable(!isAvailable);
    };

    const uploadFileHandler = async(e) => {
        const file = e.target.files[0]
        setNewImg(file)
        console.log('file', image)
    }

//   UPDATE 
  // Товары /////// //////////////////////
  const putProduct = async (e) => {
    e.preventDefault()
    try {

        let formData = new FormData();
        formData.append("user", 1);
        if(newImg != null) {
            formData.append("image", newImg);
        }

        formData.append("title", title);
        formData.append("price", price);
        formData.append("isHit", isHit);
        formData.append("isSpeciale", isSpeciale);
        formData.append("isAvailable", isAvailable);
        formData.append("description", description);

        if(selectedCategory === null || selectedCategory === 'null'){
            formData.append("category", category);
            formData.append("subcategory", subcategory);
        } else {
            formData.append("category", findedCat?.id);
            formData.append("subcategory", selectedSubCategory); 
        }
        

        const token = localStorage.getItem("token")

        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
            }
        }

        setLoading(true)
        // console.log(`user`, user)
        const response = await axios.put(`${BASE_URL}products/${params.id}/`, formData, config)
        .then(res => {
            const productUpdated = res.data;
            console.log(`productUpdated =`, productUpdated)
            
            setLoading(false)
           
            setErrors(null)
            navigate("/products");
            // navigate(ADMIN_PRODUCT_LIST)
        }).catch((err) => {
            setErrors(err.message)
            console.log(`err ===`, err.message)
        })
    } catch (error) {
        setLoading(false)
        // setErrors(error)
        console.log(`error data =`, error)
    }
    
    }

    const deleteProduct = async () => {
        try {
            const token = localStorage.getItem("token")
    
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }
    
            setLoading(true)
            // console.log(`user`, user)
            const response = await axios.delete(`${BASE_URL}products/${params.id}/`, config)
            .then(res => {
                // const productUpdated = res.data;
                console.log(`product Deleted !`)
                
                setLoading(false)
               
                setErrors(null)
                navigate("/products");
                // navigate(ADMIN_PRODUCT_LIST)
            }).catch((err) => {
                setErrors(err.message)
                console.log(`err ===`, err.message)
            })
        } catch (error) {
            setLoading(false)
            // setErrors(error)
            console.log(`error data =`, error)
        }
        
    }
    

    


    
    
    // console.log('categories', categories)




  return (
    <DashboardLayout>
      <DashboardNavbar />
        <Grid container spacing={3}>
            <Grid item xs={12} xl={6}>
                <SimpleBlogCard
                image={order.image}
                title={order.title}
                description={order.description}
                action={{
                    type: "internal",
                    route: "#",
                    color: "info",
                    label: "Airobike"
                }}
                />
                <button style={{padding: '10px', width: '100%', backgroundColor: 'red', color: '#fff'}} onClick={() => deleteProduct()}>Удалить</button>
            </Grid>
            <Grid item xs={12} xl={6}>
                <Form onSubmit={putProduct}>
                    
                    <Form.Group className="mb-3" controlId='title'>
                        <Form.Label>Название</Form.Label>
                        <br/>
                        <Form.Control
                            style={{padding: '10px', width: '100%', borderColor: 'green', borderRadius: '7px'}}
                            type='text'
                            placeholder='Название'
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId='price'>
                        <Form.Label>Цена</Form.Label>
                        <br/>
                        <Form.Control
                            style={{padding: '10px', width: '100%', borderColor: 'green', borderRadius: '7px'}}
                            type='number'
                            placeholder='Цена'
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId='image'>
                        <Form.Label>Изображение товара</Form.Label>
                        <br/>
                        <Form.Control
                            style={{padding: '10px', width: '100%', borderColor: 'green', borderRadius: '7px'}}
                            type='file'
                            placeholder='Изображение'
                            onChange={uploadFileHandler}
                        >
                        </Form.Control>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId='brand'>
                        <Form.Label>Возраст</Form.Label>
                        <br/>
                        <Form.Control
                            style={{padding: '10px', width: '100%', borderColor: 'green', borderRadius: '7px'}}
                            type='text'
                            placeholder='от 5 до 7 лет'
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId='country'>
                        <Form.Label>Страна пр-ва</Form.Label>
                        <br/>
                        <Form.Control
                            style={{padding: '10px', width: '100%', borderColor: 'green', borderRadius: '7px'}}
                            // type='number'
                            type='text'
                            placeholder='Страна пр-ва'
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId='category'>
                        <Form.Label>Категория</Form.Label>
                        <br/>
                        <Form.Select style={{padding: '10px', width: '100%', borderColor: 'green', borderRadius: '7px'}} defaultValue={null} name="myParameter" 
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)} 
                        >
                            <option value="null">Выбрать категорию</option>
                            {categories.map((i) => (
                                <option key={i.id} value={i.title}>{i.title}</option>
                            ))}
                        </Form.Select>

                    </Form.Group>

                    { selectedCategory === null || selectedCategory === 'null' ? null :
                        <Form.Group className="mb-3" controlId='subcategory'>
                            <Form.Label>Суб Категория</Form.Label>
                            <br/>
                            <Form.Select style={{padding: '10px', width: '100%', borderColor: 'green', borderRadius: '7px'}} defaultValue={null} name="myParameters" onChange={(e) => setSelectedSubCategory(e.target.value)} value={selectedSubCategory}>
                                <option value="null">Выбрать субкатегорию</option>
                                {findedCat?.sCategory?.map((i) => (
                                    <option value={i._id}>{i.title}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>

                    }



                    <Form.Group className="mb-3" controlId='descr'>
                        <Form.Label>Описание</Form.Label>
                        <br/>
                        <Form.Control
                            as="textarea" rows={6}
                            style={{padding: '10px', width: '100%', borderColor: 'green', borderRadius: '7px'}}
                            type='text'
                            placeholder='Описание'
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId='da'>
                        {/* <Form.Label>Хит продажи?</Form.Label> */}
                        {/* <br/> */}
                        <Form.Switch
                            onChange={onIsHit}
                            id="custom-switch"
                            label="Хит продажи?"
                            checked={isHit}
                            // disabled // apply if you want the switch disabled
                        />
                        <Form.Switch
                            onChange={onIsSpeciale}
                            id="custom-switch"
                            label="Спец предложение?"
                            checked={isSpeciale}
                            // disabled // apply if you want the switch disabled
                        />
                        <Form.Switch
                            onChange={onIsAvailable}
                            id="custom-switch"
                            label="Товар доступен?"
                            checked={isAvailable}
                            // disabled // apply if you want the switch disabled
                        />
                    </Form.Group>
                    <p style={{color: 'red'}}>{errors === null ? null : <p style={{color: 'red'}}>{errors}</p> }</p>
                    <p style={{color: 'green'}}>{loading === false ? null : <p style={{color: 'green'}}>Загрузка ...</p> }</p>
                    <Button
                        style={{padding: '10px', backgroundColor: 'green', width: '100%', color: '#ffffff', borderRadius: '7px', marginTop: '30px'}}
                        type='submit' variant='primary'
                    >
                        Изменить
                    </Button>
                </Form>
            </Grid>
            
        </Grid>
      <Footer />
    </DashboardLayout>
  );
}

export default ProductDetail;
