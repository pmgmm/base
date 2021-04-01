.. index:: Form Button

.. _formbutton:

Form Button
===========

Este componente executa um método, função ou script.

.. image:: ../resources/formbutton.png

Requisitos
----------
         
======================================= ===============
``/framework/components/formbutton.js`` 
``/framework/components/shared.js``     :ref:`jsshared`     
======================================= ===============

.. note:: As páginas geradas por :ref:`phppagehelper` fazem, por defeito, o carregamento dos componentes necessários.  

----

Html do componente (tag)
------------------------

.. code:: html

    <fwk-formbutton>
        <span slot="information">texto</span>
    </fwk-formbutton>

==================== ================================= =========== =============== =======
Atributo             Descrição                         Obrigatório Opções          Default
==================== ================================= =========== =============== =======
``id``               Identificador único do componente Sim (?)         
``color``            Cor base do componente            Não         "blue", "gray"  "gray" 
``value``            Texto do botão                    Sim         
``disable``          Inibe componente                  Não         "true", "false" "false" 
``hide``             Esconde componente                Não         "true", "false" "false" 
``color``            Cor base do componente            Não         "blue", "gray"  "gray" 
``tooltip-position`` Posição do tooltip                Não         "left", "right" "right"
``function``         Função a executar no evento click Sim (?)    
``script``           Script a executar no evento click Sim (?)       
==================== ================================= =========== =============== =======

.. important:: 

    O atributo ``id`` só é obrigatório no caso de ser necessária a identificação do componente para interacção com qualquer uma das suas funcionalidades.

    Os atributos ``function`` e ``script`` são mutuamente exclusivos.

=============== ===================== =========== ===========
Slot            Descrição             Obrigatório Observações
=============== ===================== =========== ===========
``information`` Tooltip de informação Não         Admite html
=============== ===================== =========== ===========

----

Função de componente
--------------------

O atributo ``function`` destina-se a definir a chamada a uma função global ou a um método de classe. Os formatos permitidos são:

======================================== ============================================                                        
Função global (formatos)                 Método de classe (formatos)                             
======================================== ============================================
function = "newRecord"                   function = "obj.newRecord"                  
function = '{"saveRecord":[param1,...]}' function = '{"obj.saveRecord":[param1,...]}'
======================================== ============================================

----

Script de componente
--------------------

| O atributo ``script`` destina-se a definir o script a ser executado. É permitido qualquer script válido.

----

Funcionalidades
---------------

Assumindo que exite um objecto instanciado com o componente:

.. code:: Javascript

    const obj_formbutton = FormHelper.getComponent('fwk_formbutton');

Valor (texto do botão)
^^^^^^^^^^^^^^^^^^^^^^
.. code:: Javascript

    obj_formbutton.value = TranslationHelper.translate('???');

Mostrar / esconder
^^^^^^^^^^^^^^^^^^
.. code:: Javascript

    obj_formbutton.hide = false;
    obj_formbutton.hide = true;

Habilitar / inibir
^^^^^^^^^^^^^^^^^^
.. code:: Javascript

    obj_formbutton.disable = false;
    obj_formbutton.disable = true;

Iniciar / terminar processamento
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
.. code:: Javascript

    obj_formbutton.processing = true;
    obj_formbutton.processing = false;

Ler estados
^^^^^^^^^^^
.. code:: Javascript

    let is_hide = obj_formbutton.hide;
    let is_disable = obj_formbutton.disable;

----

Referências
-----------

:ref:`jsformhelper` é uma classe de auxílio às operações sobre formulários.