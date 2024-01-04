import React from 'react';
import styles from "./App.module.scss"
import Footer from "./components/Footer/Footer";
import Logo from "./components/Logo/Logo";
import Header from "./components/Header/Header";
import DefaultSizes from "./components/DefaultSizes/DefaultSizes";
import GlobalParameters from "./components/GlobalParameters/GlobalParametrs";
import ImageSection from "./components/ImageSection/ImageSection";
import PresetsSection from "./components/PresetsSection/PresetsSection";
import CustomSizes from "./components/CustomSizes/CustomSizes";
import FileUpload from "./components/FileUpload/FileUpload";

const App = () => {
    return (
        <div className={styles.app}>
            <Logo/>
            <div className={styles.workspace}>
                <Header/>
                <GlobalParameters/>
                <ImageSection/>
                <PresetsSection/>
                <CustomSizes/>
                <DefaultSizes/>
            </div>
            <FileUpload onFilesDropped={() => {}}/>
            <Footer/>
        </div>
    );
};

export default App;