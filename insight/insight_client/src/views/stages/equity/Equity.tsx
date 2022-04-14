import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useInView } from "../../../hooks";
import {
  SideBar,
  Selector,
  Overview,
  IncomeStatement,
  BalanceSheet,
  CashFlow,
  FinancialRatios,
} from "../../";
import {
  Typography,
  Layout,
  Space,
  Card,
  Empty,
  BackTop,
} from "antd";
import { companyListValue, getCompanyList } from "./equitySlice";
import styles from "./Equity.module.css";
import {
  GlobalOutlined,
  CalendarOutlined,
  FormOutlined,
  ColumnWidthOutlined,
  CalculatorOutlined,
  MergeCellsOutlined,
  PoundCircleOutlined,
  UserOutlined,
  SettingOutlined,
} from "@ant-design/icons";

const { Content } = Layout;
const { Text } = Typography;

// declare typescript props type
type TProps = {
  user_name?: string;
  breakpoint: string | undefined;
};
// declare typescript state types
type TState = {
  fetchStatus: number;
  sidebarSelected: string;
};
// ---API ROOT ADDRESS---
const dataApiRootAddress = process.env.REACT_APP_DATA_API_PATH!
// const dataApiRootAddress = "https://insight-rest.herokuapp.com/data/";
// const dataApiRootAddress = "http://localhost:3001/data/";


const sidebarItems: object[][] = [
  [{ Overview: <GlobalOutlined /> }],
  [
    { "Income Statement": <CalendarOutlined /> },
    { "Balance Sheet": <FormOutlined /> },
    { "Cash Flow": <ColumnWidthOutlined /> },
  ],
  [
    { "Financial Ratios": <CalculatorOutlined /> },
    { "Discounted Cash Flow": <PoundCircleOutlined /> },
    { "Comparable Analysis": <MergeCellsOutlined /> },
  ],
  [{ User: <UserOutlined /> }, { Settings: <SettingOutlined /> }],
];

export const Equity: React.FC<TProps> = ({ ...props }): JSX.Element => {

  // gets state data from the equity reducer and passes it to the selector
  // as props to display as list of companies when clicked
  const company_list = useSelector(companyListValue);

  // ---initialise redux store dispatcher and assign to dispatch variable for simplicity---
  const dispatch = useDispatch();

  // ---implementation of all useState hook---
  const [fetchStatus, setfetchStatus] = useState<TState["fetchStatus"]>();
  const [sidebarSelected, setsidebarSelected] = useState<
    TState["sidebarSelected"]
  >();

  // control what section is scrolled into view when a menu item is clicked on sidebar
  // it has a dictionary of "menu item value as key" : "and useRef to required section as value"
  const sideBarItemOnClick = (arg: { [key: string]: any }) => {
    document.getElementById(arg.key?.replace(" ", "_"))?.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  };
  //---implementation of useInView custom hook which returns the id of the current 
  // component in the viewport 
  const [idInView] = useInView([
    "Overview",
    "Income_Statement",
    "Balance_Sheet",
    "Cash_Flow",
    "Financial_Ratios"
  ])
  // pass on the key of the current component in the viewport to the sidebar feature
  // to highlight it
  useEffect(() => {
    setsidebarSelected(String(idInView).replace("_", " "));
  }, [idInView])

  // implementation of useEffect hook
  // fetch company list data from api and dispatch results to redux store onn component mount
  useEffect(() => {
    let currentYearEnded = new Date(Date.now()).getFullYear() - 1;
    fetch(`${dataApiRootAddress}all_companies?period=${currentYearEnded}`)
      .then((res) => res.json())
      .then(
        (result) => {
          dispatch(getCompanyList(result));
        },
        (error) => {
          // catch fetch error here;
        }
      );
  }, [dispatch]);

  return (
    <div className={styles.root}>
      <BackTop />
      <Layout>
        {/* pull in sidebar feature from views features */}
        <SideBar
          items={sidebarItems}
          selected={sidebarSelected}
          clickHandler={sideBarItemOnClick}
        />
        <Content className={styles.content_section}>
          <Space direction="vertical" size="large" style={{ width: "100%" }}>
            {/* pulls in selector feature which is used to select company search query */}
            <div className={styles.selector_feature}>
              <Selector
                api_root_address={dataApiRootAddress}
                placeholder="select a company"
                options_list={company_list}
                fetchCycle={(arg: number) => {
                  setfetchStatus(arg);
                }}
              />
            </div>

            {/* this section shows empty stage on load and if a company 
            selected it shows the overview information of the company
            it also shows a card loading animation while fetching*/}
            {fetchStatus === 0 ? (
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description={
                  <span>
                    <Text disabled>
                      Select a company to start |
                      <a href="/"> Quick tour of the dashboard</a>
                    </Text>
                  </span>
                }
              />
            ) : null}
            {fetchStatus === 1 ? <Card loading={true} /> : null}
            {fetchStatus === 2 ? (
              <React.Fragment>
                <div
                  id="Overview"
                  className={styles.overview_feature}
                >
                  <Overview 
                  breakpoint={props.breakpoint}
                  />
                </div>

                {/* this section shows the income statement feature when a company is selected */}
                <div
                  id="Income_Statement"
                  className={styles.income_statement_feature}
                >
                  <IncomeStatement />
                </div>

                {/* this section shows the balance sheet feature when a company is selected */}
                <div
                  id="Balance_Sheet"
                  className={styles.balance_sheet_feature}
                >
                  <BalanceSheet />
                </div>

                {/* this section shows the cash flow feature when a company is selected */}
                <div
                  id="Cash_Flow"
                  className={styles.cash_flow}
                >
                  <CashFlow />
                </div>

                {/* this section shows the financial ratios feature when a company is selected */}
                <div
                  id="Financial_Ratios"
                  className={styles.financial_ratios}
                >
                  <FinancialRatios />
                </div>
              </React.Fragment>
            ) : null}
          </Space>
        </Content>
      </Layout>
    </div>
  );
};

// declare default values for props that are not explicitly declared
Equity.defaultProps = {
  user_name: "Guest User",
};
