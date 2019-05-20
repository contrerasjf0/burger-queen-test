
import {Container} from 'unstated';

import { menuRef } from '../firebase';

class Menu extends Container {
    state={
            breakfastList:[],
            fastFoodList:[]
    };

    menuSectionBreakFast = 1;
    menuSectionFastFood = 2;

    getBreakfastList = () => {
        menuRef.once('value')
                .then((snapshot) => {
                    let breakfastList = [],
                    fastFoodList = [];

                    snapshot.forEach((childrenSnapshot)=>{
                            let val = childrenSnapshot.val();
                            if(val.menuSection === this.menuSectionBreakFast){
                                breakfastList.push(val);
                            }else if(val.menuSection === this.menuSectionFastFood){
                                fastFoodList.push(val);
                            }
                            
                    });

                    this.setState({breakfastList, fastFoodList});
                });
    }

}

export default Menu;