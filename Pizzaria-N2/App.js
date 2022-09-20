import { StatusBar } from 'expo-status-bar';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import Home from './componentes/Telas/Home/index';
import Produtos from './componentes/Telas/Produtos/index';
import ProdutosVenda from './componentes/Telas/ProdutosVenda/index';
import Vendas from './componentes/Telas/Vendas/index';
import Categorias from './componentes/Telas/Categorias/index';
import Carrinhos from './componentes/Telas/Carrinho/index';


const Routes = createAppContainer(
  createSwitchNavigator({
    Home,
    Produtos,
    ProdutosVenda,
    Vendas,
    Carrinhos,
    Categorias,
  })
);


export default function App() {
  return (
      <Routes/>      
  );
}