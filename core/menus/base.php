<?php

namespace CORE\menus\base;

use \FWK\helpers\TranslationHelper as TH;
use \FWK\helpers\PermissionHelper;


// Permissões de sistema
$is_administrator = PermissionHelper::validate(array('ADMINISTRATION'));
$is_maintenancer = PermissionHelper::validate(array('MAINTENANCE'));
$is_supporter = PermissionHelper::validate(array('SUPPORT'));
$is_developer = PermissionHelper::validate(array('DEVELOPMENT'));


$base_menu = array();

// Módulo de Administração
if ($is_administrator || PermissionHelper::validateModule('MODULE_ADMINISTRATION')) {

    $partial_menu = array('id' => 'administration', 'main' => true, 'value' => TH::translate('ADMINISTRAÇÃO'), 'elements' => array());

    if ($is_administrator || PermissionHelper::validateModule('MODULE_ORGANIZATION')) {
        $partial_menu['elements'][] = array('id' => 'administration_organization', 'value' => TH::translate('ORGANIZAÇÃO'), 'action' => 'menu', 'target' => 'organization');
    }
    if ($is_administrator || PermissionHelper::validate(array('APP_PWA'), PermissionHelper::READ)) {
        $partial_menu['elements'][] = array('id' => 'administration_apps', 'value' => TH::translate('APPS / PWAS'), 'action' => 'page', 'target' => '/ui/admin/app/list.php');
    }

    $base_menu[] = $partial_menu;
}


// Módulo de Manutenção
if ($is_administrator || $is_maintenancer || PermissionHelper::validateModule('MODULE_MAINTENANCE')) {
    
    $partial_menu = array('id' => 'maintenance', 'main' => true, 'value' => TH::translate('MANUTENÇÃO'), 'elements' => array(
                                    array('id' => 'a2', 'value' => 'A2 222222', 'action' => 'menu', 'target' => 1)
                                    ));

    $base_menu[] = $partial_menu;     
}


// Módulo de Suporte
if ($is_administrator || $is_supporter || PermissionHelper::validateModule('MODULE_SUPPORT')) {
    
    $partial_menu = array('id' => 'support', 'main' => true, 'value' => TH::translate('SUPORTE'), 'elements' => array(
                                    array('id' => 'support_impersonate', 'value' => TH::translate('PERSONIFICAR'), 'disable' => false, 'action' => 'page', 'target' => 'https://www.google.com'),
                                    array('id' => 'support_filters', 'value' => TH::translate('FILTROS'), 'disable' => false, 'action' => 'page', 'target' => '/ui/support/filter/list.php')
                                ));

    $base_menu[] = $partial_menu;   
}

// Módulo de Delivery
if ($is_administrator || PermissionHelper::validateModule('MODULE_DELIVERY')) {
    
    $partial_menu = array('id' => 'delivery', 'main' => true, 'value' => TH::translate('ENTREGAS'), 'elements' => array());

     if ($is_administrator || PermissionHelper::validate(array('DELIVERY_USER'), PermissionHelper::READ)) {
        $partial_menu['elements'][] = array('id' => 'delivery_users', 'value' => TH::translate('ESTAFETAS'), 'disable' => false, 'action' => 'page', 'target' => '/ui/delivery/user/list.php');
     }

     $base_menu[] = $partial_menu;  
}

// Módulo de Desenvolvimento
if (DEVELOPMENT['status'] && ($is_administrator || $is_developer || PermissionHelper::validateModule('MODULE_DEVELOPMENT'))) {

    $partial_menu = array('id' => 'development', 'main' => true, 'value' => TH::translate('DEV'), 'elements' => array());
    
    $partial_menu['elements'][] = array('id' => 'languages', 'value' => TH::translate('IDIOMAS'), 'action' => 'menu', 'target' => 'languages');

    $base_menu[] = $partial_menu; 
}

//                              
$partial_menu = array('id' => 'b', 'main' => true, 'value' => 'MENU-B', 'disable' => false, 'elements' => array(
                                array('id' => 'b1', 'value' => 'B1 111111', 'disable' => false, 'action' => 'page', 'target' => 'www.google.com'),
                                array('id' => 'b2', 'value' => 'B2 222222', 'disable' => false, 'action' => 'menu', 'target' => 1),
                                ));
$base_menu[] = $partial_menu; 

//
$partial_menu = array('id' => 'c', 'main' => true, 'value' => 'MENU-C', 'disable' => false, 'elements' => array(
                                array('id' => 'c1','value' => 'C1 111111', 'disable' => false, 'action' => 'page', 'target' => 'www.google.com'),
                                array('id' => 'c2','value' => 'C2 222222', 'disable' => false, 'action' => 'menu', 'target' => 1),
                                array('id' => 'c3','value' => 'C3 333333', 'disable' => false, 'action' => 'menu', 'target' => 2)
                                ));
$base_menu[] = $partial_menu;   

//
$partial_menu = array('id' => 1, 'elements' => array(
                                array('id' => 11, 'value' => '11 111111', 'disable' => false, 'action' => 'page', 'target' => 'www.google.com')
                                ));
$base_menu[] = $partial_menu;

//
$partial_menu = array('id' => 2, 'elements' => array(
                                array('id' => 21, 'value' => '21 111111', 'disable' => false, 'action' => 'page', 'target' => 'www.google.com'),
                                array('id' => 22, 'value' => '22 222222', 'disable' => false, 'action' => 'page', 'target' => 'www.google.com'),
                                array('id' => 23, 'value' => '23 333333', 'disable' => false, 'action' => 'page', 'target' => 'www.google.com')
                                ));
$base_menu[] = $partial_menu;

// Módulo de ORGANIZAÇÃO
$partial_menu = array('id' => 'organization', 'elements' => array());

if ($is_administrator || PermissionHelper::validate(array('GROUP'), PermissionHelper::READ)) {
    $partial_menu['elements'][] = array('id' => 'organization_groups', 'value' => TH::translate('GRUPOS'), 'action' => 'page', 'target' => '/ui/admin/group/list.php');
}  
if ($is_administrator || PermissionHelper::validate(array('ROLE'), PermissionHelper::READ)) {
    $partial_menu['elements'][] = array('id' => 'organization_roles', 'value' => TH::translate('FUNÇÕES'), 'action' => 'page', 'target' => '/ui/admin/role/list.php');
}  
if ($is_administrator || PermissionHelper::validate(array('PERMISSION'), PermissionHelper::READ)) {
    $partial_menu['elements'][] = array('id' => 'organization_permissions', 'value' => TH::translate('PERMISSÕES'), 'action' => 'page', 'target' => '/ui/admin/permission/list.php');
}  
if ($is_administrator || PermissionHelper::validate(array('USER'), PermissionHelper::READ)) {
    $partial_menu['elements'][] = array('id' => 'organization_users', 'value' => TH::translate('UTILIZADORES'), 'action' => 'page', 'target' => '/ui/admin/user/list.php');
}
$base_menu[] = $partial_menu;

// Módulo de IDIOMAS
$partial_menu = array('id' => 'languages', 'elements' => array());

$partial_menu['elements'][] = array('id' => 'translations', 'value' => TH::translate('TRADUÇÕES'), 'action' => 'page', 'target' => '/ui/dev/translation/list.php');
if ($is_administrator || $is_developer) {
    $partial_menu['elements'][] = array('id' => 'generate', 'value' => TH::translate('GERAR FICHEIROS'), 'action' => 'page', 'target' => '/ui/dev/translation/generate.php');
}
$base_menu[] = $partial_menu;
//--- END