'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">sport-resa documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-AppModule-c0d7ceb5a2ccaebff67bdeb1eab8388e129224e0bdd527ae2fb3317d93e18d6a503a9a4c31787550deb712daff75cdbcc7adafc444da66af0cfcc6709758f9d3"' : 'data-bs-target="#xs-components-links-module-AppModule-c0d7ceb5a2ccaebff67bdeb1eab8388e129224e0bdd527ae2fb3317d93e18d6a503a9a4c31787550deb712daff75cdbcc7adafc444da66af0cfcc6709758f9d3"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-c0d7ceb5a2ccaebff67bdeb1eab8388e129224e0bdd527ae2fb3317d93e18d6a503a9a4c31787550deb712daff75cdbcc7adafc444da66af0cfcc6709758f9d3"' :
                                            'id="xs-components-links-module-AppModule-c0d7ceb5a2ccaebff67bdeb1eab8388e129224e0bdd527ae2fb3317d93e18d6a503a9a4c31787550deb712daff75cdbcc7adafc444da66af0cfcc6709758f9d3"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link" >AppRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/BookingModule.html" data-type="entity-link" >BookingModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-BookingModule-5470be35d527e1593318ca289928a44beee291314e14b0b8569eddb78b5e44f8252191dd6445faa23eb6d11e212cfe9d340aba80c68f2508742b0ddb1424b52d"' : 'data-bs-target="#xs-components-links-module-BookingModule-5470be35d527e1593318ca289928a44beee291314e14b0b8569eddb78b5e44f8252191dd6445faa23eb6d11e212cfe9d340aba80c68f2508742b0ddb1424b52d"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-BookingModule-5470be35d527e1593318ca289928a44beee291314e14b0b8569eddb78b5e44f8252191dd6445faa23eb6d11e212cfe9d340aba80c68f2508742b0ddb1424b52d"' :
                                            'id="xs-components-links-module-BookingModule-5470be35d527e1593318ca289928a44beee291314e14b0b8569eddb78b5e44f8252191dd6445faa23eb6d11e212cfe9d340aba80c68f2508742b0ddb1424b52d"' }>
                                            <li class="link">
                                                <a href="components/BookingComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BookingComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/BookingRoutingModule.html" data-type="entity-link" >BookingRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/EstablishmentModule.html" data-type="entity-link" >EstablishmentModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-EstablishmentModule-b27119b7c35acb179ffb7ca3420ba3e6c75a82aa83eefa8738748ccfbd4b8ccff086816b63be372f29111439cd7ca72660b82a97be8adc83a2a7f9409ab9dc2b"' : 'data-bs-target="#xs-components-links-module-EstablishmentModule-b27119b7c35acb179ffb7ca3420ba3e6c75a82aa83eefa8738748ccfbd4b8ccff086816b63be372f29111439cd7ca72660b82a97be8adc83a2a7f9409ab9dc2b"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-EstablishmentModule-b27119b7c35acb179ffb7ca3420ba3e6c75a82aa83eefa8738748ccfbd4b8ccff086816b63be372f29111439cd7ca72660b82a97be8adc83a2a7f9409ab9dc2b"' :
                                            'id="xs-components-links-module-EstablishmentModule-b27119b7c35acb179ffb7ca3420ba3e6c75a82aa83eefa8738748ccfbd4b8ccff086816b63be372f29111439cd7ca72660b82a97be8adc83a2a7f9409ab9dc2b"' }>
                                            <li class="link">
                                                <a href="components/EstablishmentAddComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EstablishmentAddComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EstablishmentComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EstablishmentComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EstablishmentEditComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EstablishmentEditComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EstablishmentListComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EstablishmentListComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EstablishmentPageComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EstablishmentPageComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/EstablishmentRouting.html" data-type="entity-link" >EstablishmentRouting</a>
                            </li>
                            <li class="link">
                                <a href="modules/HomeModule.html" data-type="entity-link" >HomeModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-HomeModule-f4afc55485e6a8b76ef994ef26c351d8236d9f7a8a1a622ad34ce786eb5d4ce24af304854410c8cade1b7792ac9488b663a14dee469155785deafc738a01e43b"' : 'data-bs-target="#xs-components-links-module-HomeModule-f4afc55485e6a8b76ef994ef26c351d8236d9f7a8a1a622ad34ce786eb5d4ce24af304854410c8cade1b7792ac9488b663a14dee469155785deafc738a01e43b"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-HomeModule-f4afc55485e6a8b76ef994ef26c351d8236d9f7a8a1a622ad34ce786eb5d4ce24af304854410c8cade1b7792ac9488b663a14dee469155785deafc738a01e43b"' :
                                            'id="xs-components-links-module-HomeModule-f4afc55485e6a8b76ef994ef26c351d8236d9f7a8a1a622ad34ce786eb5d4ce24af304854410c8cade1b7792ac9488b663a14dee469155785deafc738a01e43b"' }>
                                            <li class="link">
                                                <a href="components/HomeComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HomeComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/HomeRoutingModule.html" data-type="entity-link" >HomeRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/LoginModule.html" data-type="entity-link" >LoginModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-LoginModule-3e2e12b049fb47c9ef9669db37f148f3dd486a3d514b0ba48bf4311d2719e389068ec0ec44ea0872f9525f737efd6e928c0954bd7a77224c77b628a3c1b3c689"' : 'data-bs-target="#xs-components-links-module-LoginModule-3e2e12b049fb47c9ef9669db37f148f3dd486a3d514b0ba48bf4311d2719e389068ec0ec44ea0872f9525f737efd6e928c0954bd7a77224c77b628a3c1b3c689"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-LoginModule-3e2e12b049fb47c9ef9669db37f148f3dd486a3d514b0ba48bf4311d2719e389068ec0ec44ea0872f9525f737efd6e928c0954bd7a77224c77b628a3c1b3c689"' :
                                            'id="xs-components-links-module-LoginModule-3e2e12b049fb47c9ef9669db37f148f3dd486a3d514b0ba48bf4311d2719e389068ec0ec44ea0872f9525f737efd6e928c0954bd7a77224c77b628a3c1b3c689"' }>
                                            <li class="link">
                                                <a href="components/LoginComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LoginComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-LoginModule-3e2e12b049fb47c9ef9669db37f148f3dd486a3d514b0ba48bf4311d2719e389068ec0ec44ea0872f9525f737efd6e928c0954bd7a77224c77b628a3c1b3c689"' : 'data-bs-target="#xs-injectables-links-module-LoginModule-3e2e12b049fb47c9ef9669db37f148f3dd486a3d514b0ba48bf4311d2719e389068ec0ec44ea0872f9525f737efd6e928c0954bd7a77224c77b628a3c1b3c689"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-LoginModule-3e2e12b049fb47c9ef9669db37f148f3dd486a3d514b0ba48bf4311d2719e389068ec0ec44ea0872f9525f737efd6e928c0954bd7a77224c77b628a3c1b3c689"' :
                                        'id="xs-injectables-links-module-LoginModule-3e2e12b049fb47c9ef9669db37f148f3dd486a3d514b0ba48bf4311d2719e389068ec0ec44ea0872f9525f737efd6e928c0954bd7a77224c77b628a3c1b3c689"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/LoginRoutingModule.html" data-type="entity-link" >LoginRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/RegisterModule.html" data-type="entity-link" >RegisterModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-RegisterModule-e800823bac6e205780b1db83e1ec3ee64f97b7dccc25a3c0f880e7e0bef8d8f913dc1fa0cadb9d0f7f67748d1cdf80cb972b7259557659b1e6954f68128cfdf4"' : 'data-bs-target="#xs-components-links-module-RegisterModule-e800823bac6e205780b1db83e1ec3ee64f97b7dccc25a3c0f880e7e0bef8d8f913dc1fa0cadb9d0f7f67748d1cdf80cb972b7259557659b1e6954f68128cfdf4"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-RegisterModule-e800823bac6e205780b1db83e1ec3ee64f97b7dccc25a3c0f880e7e0bef8d8f913dc1fa0cadb9d0f7f67748d1cdf80cb972b7259557659b1e6954f68128cfdf4"' :
                                            'id="xs-components-links-module-RegisterModule-e800823bac6e205780b1db83e1ec3ee64f97b7dccc25a3c0f880e7e0bef8d8f913dc1fa0cadb9d0f7f67748d1cdf80cb972b7259557659b1e6954f68128cfdf4"' }>
                                            <li class="link">
                                                <a href="components/RegisterComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RegisterComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/RegisterRoutingModule.html" data-type="entity-link" >RegisterRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/SessionModule.html" data-type="entity-link" >SessionModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-SessionModule-2ecda34e86984977bce346d20ca9bea9c6546593d6a2169625cb398c255a6bda33b93aeb3a83312ba32dace51d7dd2e41ff34bf30564b870f6bbeaa1be508d3b"' : 'data-bs-target="#xs-components-links-module-SessionModule-2ecda34e86984977bce346d20ca9bea9c6546593d6a2169625cb398c255a6bda33b93aeb3a83312ba32dace51d7dd2e41ff34bf30564b870f6bbeaa1be508d3b"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SessionModule-2ecda34e86984977bce346d20ca9bea9c6546593d6a2169625cb398c255a6bda33b93aeb3a83312ba32dace51d7dd2e41ff34bf30564b870f6bbeaa1be508d3b"' :
                                            'id="xs-components-links-module-SessionModule-2ecda34e86984977bce346d20ca9bea9c6546593d6a2169625cb398c255a6bda33b93aeb3a83312ba32dace51d7dd2e41ff34bf30564b870f6bbeaa1be508d3b"' }>
                                            <li class="link">
                                                <a href="components/SessionComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SessionComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SessionDetailComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SessionDetailComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SessionEstablishmentListingPageComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SessionEstablishmentListingPageComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SessionFilterComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SessionFilterComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SessionsListingAllComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SessionsListingAllComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/SessionRoutingModule.html" data-type="entity-link" >SessionRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/UserModule.html" data-type="entity-link" >UserModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-UserModule-9f0615c5d066ae36ebff2e8cc9b360a3bbe52cf10d1f8f4a4e3ace56a4451a659db40593a5ea9ec3819fd61064054e9548e6045009a0d4d5c90db2abeee44936"' : 'data-bs-target="#xs-components-links-module-UserModule-9f0615c5d066ae36ebff2e8cc9b360a3bbe52cf10d1f8f4a4e3ace56a4451a659db40593a5ea9ec3819fd61064054e9548e6045009a0d4d5c90db2abeee44936"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-UserModule-9f0615c5d066ae36ebff2e8cc9b360a3bbe52cf10d1f8f4a4e3ace56a4451a659db40593a5ea9ec3819fd61064054e9548e6045009a0d4d5c90db2abeee44936"' :
                                            'id="xs-components-links-module-UserModule-9f0615c5d066ae36ebff2e8cc9b360a3bbe52cf10d1f8f4a4e3ace56a4451a659db40593a5ea9ec3819fd61064054e9548e6045009a0d4d5c90db2abeee44936"' }>
                                            <li class="link">
                                                <a href="components/UserDashboardComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserDashboardComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UserListComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserListComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UsersPageComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersPageComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-UserModule-9f0615c5d066ae36ebff2e8cc9b360a3bbe52cf10d1f8f4a4e3ace56a4451a659db40593a5ea9ec3819fd61064054e9548e6045009a0d4d5c90db2abeee44936"' : 'data-bs-target="#xs-injectables-links-module-UserModule-9f0615c5d066ae36ebff2e8cc9b360a3bbe52cf10d1f8f4a4e3ace56a4451a659db40593a5ea9ec3819fd61064054e9548e6045009a0d4d5c90db2abeee44936"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UserModule-9f0615c5d066ae36ebff2e8cc9b360a3bbe52cf10d1f8f4a4e3ace56a4451a659db40593a5ea9ec3819fd61064054e9548e6045009a0d4d5c90db2abeee44936"' :
                                        'id="xs-injectables-links-module-UserModule-9f0615c5d066ae36ebff2e8cc9b360a3bbe52cf10d1f8f4a4e3ace56a4451a659db40593a5ea9ec3819fd61064054e9548e6045009a0d4d5c90db2abeee44936"' }>
                                        <li class="link">
                                            <a href="injectables/UserFacadeService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserFacadeService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UserService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UserRoutingModule.html" data-type="entity-link" >UserRoutingModule</a>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#components-links"' :
                            'data-bs-target="#xs-components-links"' }>
                            <span class="icon ion-md-cog"></span>
                            <span>Components</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="components-links"' : 'id="xs-components-links"' }>
                            <li class="link">
                                <a href="components/EstablishmentComponent.html" data-type="entity-link" >EstablishmentComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/EstablishmentEditComponent.html" data-type="entity-link" >EstablishmentEditComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/EstablishmentListComponent.html" data-type="entity-link" >EstablishmentListComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/EstablishmentPageComponent.html" data-type="entity-link" >EstablishmentPageComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/SessionComponent.html" data-type="entity-link" >SessionComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/SessionDetailComponent.html" data-type="entity-link" >SessionDetailComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/SessionEstablishmentListingPageComponent.html" data-type="entity-link" >SessionEstablishmentListingPageComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/SessionFilterComponent.html" data-type="entity-link" >SessionFilterComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/UserListComponent.html" data-type="entity-link" >UserListComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/UsersPageComponent.html" data-type="entity-link" >UsersPageComponent</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AppInitializerService.html" data-type="entity-link" >AppInitializerService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link" >AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/BookingFacadeService.html" data-type="entity-link" >BookingFacadeService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/BookingService.html" data-type="entity-link" >BookingService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/EstablishmentFacadeService.html" data-type="entity-link" >EstablishmentFacadeService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/EstablishmentService.html" data-type="entity-link" >EstablishmentService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/InMemoryDataService.html" data-type="entity-link" >InMemoryDataService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SessionService.html" data-type="entity-link" >SessionService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserFacadeService.html" data-type="entity-link" >UserFacadeService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserService.html" data-type="entity-link" >UserService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/Booking.html" data-type="entity-link" >Booking</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DialogData.html" data-type="entity-link" >DialogData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Establishment.html" data-type="entity-link" >Establishment</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FilterPayload.html" data-type="entity-link" >FilterPayload</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FormattedOpeningHour.html" data-type="entity-link" >FormattedOpeningHour</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/OpeningHour.html" data-type="entity-link" >OpeningHour</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Session.html" data-type="entity-link" >Session</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/sessionByEstablishment.html" data-type="entity-link" >sessionByEstablishment</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/User.html" data-type="entity-link" >User</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});