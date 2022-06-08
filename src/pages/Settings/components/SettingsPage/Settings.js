import {
  Accordion, AccordionDetails, AccordionSummary, Card, CardContent, makeStyles, Typography,
} from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';
import { useContext, useEffect, useState } from 'react';
import StoreContext from '../../../../store/StoreContext';
import { MyCompanySettings } from '../MyCompanySettings/MyCompanySettings';
import { MyEmployees } from '../MyEmployees/MyEmployees';
import { UpdatePasswordForm } from '../UpdatePasswordForm/UpdatePasswordForm';
import './Settings.scss';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
}));

function Settings() {
  const { user } = useContext(StoreContext);
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [isManager, setIsManager] = useState(false);

  useEffect(() => {
    setIsManager(user.roles && user.roles[0] && ['ROLE_COMPANY_MANAGER', 'ROLE_ADMIN'].includes(user.roles[0].name));
  }, []);

  const toggleAccordion = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div>
      <Card className="settings-container">
        <CardContent>
          <Accordion expanded={expanded === 'updatePassword'} onChange={toggleAccordion('updatePassword')}>
            <AccordionSummary
              expandIcon={<ExpandMore />}
              aria-controls="updatePassword-content"
              id="updatePassword-header"
            >
              <Typography className={classes.heading}>Alterar Senha</Typography>
              <Typography className={classes.secondaryHeading}>
                Alterar senha para acesso ao sistema
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <UpdatePasswordForm />
            </AccordionDetails>
          </Accordion>

          {
            isManager && (
              <>
                <Accordion expanded={expanded === 'company'} onChange={toggleAccordion('company')}>
                  <AccordionSummary
                    expandIcon={<ExpandMore />}
                    aria-controls="company-content"
                    id="company-header"
                  >
                    <Typography className={classes.heading}>Minha Empresa</Typography>
                    <Typography className={classes.secondaryHeading}>
                      Alterar Informações de sua empresa no sistema
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <MyCompanySettings />
                  </AccordionDetails>
                </Accordion>

                <Accordion expanded={expanded === 'company-users'} onChange={toggleAccordion('company-users')}>
                  <AccordionSummary
                    expandIcon={<ExpandMore />}
                    aria-controls="company-users-content"
                    id="company-users-header"
                  >
                    <Typography className={classes.heading}>Meus Funcionários</Typography>
                    <Typography className={classes.secondaryHeading}>
                      Visualizar e alterar os funcionários de sua empresa
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <MyEmployees />
                  </AccordionDetails>
                </Accordion>
              </>
            )
          }

        </CardContent>
      </Card>
    </div>
  );
}

export default Settings;
