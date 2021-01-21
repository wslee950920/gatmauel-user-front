import React, { useMemo } from "react";

import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import {useTheme} from '@material-ui/core/styles';

  const AddrBtn = ({ data, style, index, length, addrOnClick }) => {
    const theme=useTheme();

    const divider = useMemo(() => {
      if (index !== length - 1) return true;
      else return false;
    }, [index, length]);
  
    return (
      <div style={style}>
        <CssBaseline />
        <Container maxWidth="sm">
          <ListItem 
            divider={divider} 
            button 
            style={{height:100}} 
            onClick={()=>{
                if(!data.road_address){
                    alert('도로명주소를 입력해주세요.');

                    return;
                } else{
                    addrOnClick(data.address_name);
                }
            }}>
            <ListItemText
              primary={data.address_name}
              secondary={data.address_type==='ROAD'?
                data.road_address.region_1depth_name+' '+
                data.road_address.region_2depth_name+' '+
                data.road_address.region_3depth_name+' ':
                data.address_type==='ROAD_ADDR'?
                data.address?data.address.address_name:
                data.road_address.region_1depth_name+' '+
                data.road_address.region_2depth_name+' '+
                data.road_address.region_3depth_name+' ':
                data.address_type==='REGION_ADDR'?
                data.road_address?data.road_address.address_name:
                '도로명주소가 없습니다.':'도로명 주소가 없습니다.'
              }
              secondaryTypographyProps={{
                variant: "body2",
                style:{
                    marginTop:theme.spacing(1),
                    ...(!(data.road_address)&&{
                        color:theme.palette.warning.light
                    })
                }
              }}
            />
          </ListItem>
        </Container>
      </div>
    );
  };
  
  export default React.memo(AddrBtn);