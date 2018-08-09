package matimatiks.matimatiks;

import android.annotation.TargetApi;
import android.app.ProgressDialog;
import android.content.Context;
import android.content.Intent;
import android.graphics.Color;
import android.media.MediaPlayer;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.support.design.widget.Snackbar;
import android.support.v4.app.Fragment;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.SurfaceHolder;
import android.view.SurfaceView;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.FrameLayout;
import android.widget.ListAdapter;
import android.widget.ListView;
import android.widget.TextView;
import android.widget.Toast;

import com.google.android.gms.tasks.OnFailureListener;
import com.google.android.gms.tasks.OnSuccessListener;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.storage.FirebaseStorage;
import com.google.firebase.storage.StorageReference;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Random;



/**
 * A simple {@link Fragment} subclass.
 * Activities that contain this fragment must implement the
 * {@link Waec_jamb_View.OnFragmentInteractionListener} interface
 * to handle interaction events.
 * Use the {@link Waec_jamb_View#newInstance} factory method to
 * create an instance of this fragment.
 */
public class Waec_jamb_View extends Fragment implements ActivityActions, RandomGen, SurfaceHolder.Callback {
    // TODO: Rename parameter arguments, choose names that match
    // the fragment initialization parameters, e.g. ARG_ITEM_NUMBER
    private static final String ARG_PARAM1 = "param1";
    private static final String ARG_PARAM2 = "param2";

    // TODO: Rename and change types of parameters
    private String mParam1;
    private String mParam2;
    private ListView listView;
    private FrameLayout.LayoutParams layoutParams;
    private FirebaseStorage storage;
    private StorageReference storageRef;
    private ProgressDialog progress;
    private FirebaseAuth.AuthStateListener mAuthListener;
    private FirebaseAuth firebaseAuth;
    private int type, frag;
    private Intent intent;
    private Random rand;
    private List<String> f_list;
    private ListAdapter listAdapter;
    private static int count;
    private ArrayList<Integer> Qlist;
    private OnFragmentInteractionListener mListener;
    private MediaPlayer mp;
    private SurfaceView mSurfaceView;
    private Snackbar snackbar;
    private  View view = null;


    public Waec_jamb_View() {
        // Required empty public constructor
    }

    /**
     * Use this factory method to create a new instance of
     * this fragment using the provided parameters.
     *
     * @param param1 Parameter 1.
     * @param param2 Parameter 2.
     * @return A new instance of fragment Waec_jamb_View.
     */
    // TODO: Rename and change types and number of parameters
    public static Waec_jamb_View newInstance(String param1, String param2) {
        Waec_jamb_View fragment = new Waec_jamb_View();
        Bundle args = new Bundle();
        args.putString(ARG_PARAM1, param1);
        args.putString(ARG_PARAM2, param2);
        fragment.setArguments(args);
        return fragment;
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        if (getArguments() != null) {
            mParam1 = getArguments().getString(ARG_PARAM1);
            mParam2 = getArguments().getString(ARG_PARAM2);


        }
        storageRef = FirebaseStorage.getInstance().getReference();
        firebaseAuth = FirebaseAuth.getInstance();
    }

    /**
     * Set a hint for whether this fragment's menu should be visible.  This
     * is useful if you know that a fragment has been placed in your view
     * hierarchy so that the user can not currently seen it, so any menu items
     * it has should also not be shown.
     *
     * @param menuVisible The default is true, meaning the fragment's menu will
     *                    be shown as usual.  If false, the user will not see the menu.
     */
    @Override
    public void setMenuVisibility(boolean menuVisible) {
        super.setMenuVisibility(menuVisible);

        if (menuVisible) {
            frag = 0;
        }

    }

    @Override
    public void onViewCreated(View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);

        mp = new MediaPlayer();
        mSurfaceView = getActivity().findViewById(R.id.surface);
        mSurfaceView.getHolder().addCallback(this);

    }

    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {

         view = inflater.inflate(R.layout.waec_jamb_view, container, false);
        ArrayList<String>items = new ArrayList<>();

        if(Profile.mode != 2) {
            items.add("Algebra");
            items.add("Geometry");
            items.add("Statistics");
            items.add("Integers");
            items.add("Sets & Logic");
            items.add("Numbers");
            items.add("Mensuration");
        }

        Collections.sort(items);


        listView = view.findViewById(R.id.Waeclist);

        ArrayAdapter<String> listviewAdapter = new ArrayAdapter<String>(getActivity()
                , R.layout.support_simple_spinner_dropdown_item, items);

        listView.setAdapter(listviewAdapter);

        layoutParams = new FrameLayout.LayoutParams(FrameLayout.LayoutParams.MATCH_PARENT, FrameLayout.LayoutParams.WRAP_CONTENT);

        layoutParams.setMargins(0, (int) Profile.height, 0, 0);

        listView.setLayoutParams(layoutParams);

        Clicked(listView);

        return view;
    }

    // TODO: Rename method, update argument and hook method into UI event
    public void onButtonPressed(Uri uri) {
        if (mListener != null) {
            mListener.onHomeFragmentInteraction(uri);
        }
    }

    @Override
    public void onAttach(Context context) {
        super.onAttach(context);
        if (context instanceof OnFragmentInteractionListener) {
            mListener = (OnFragmentInteractionListener) context;
        } else {
            throw new RuntimeException(context.toString()
                    + " must implement OnFragmentInteractionListener");
        }
    }

    @Override
    public void onDetach() {
        super.onDetach();
        mListener = null;
    }


    /**
     *
     */
    @Override
    public void getImage_A() {
        int NOF = 2;
        switch ((int) Profile.mode) {
            case 0:
                Showprogress();
                randomNum(NOF);
                storageRef.child("Waec-Jamb").child("Readthroughmode").child("Algebra").child("Questions").child("Q" + Qlist.get(0) + ".jpg")
                        .getBytes(Long.MAX_VALUE).addOnSuccessListener(new OnSuccessListener<byte[]>() {
                    @Override
                    public void onSuccess(byte[] bytes) {
                        Hideprogress();
                        Intent intent = new Intent(getActivity(), Questions.class);
                        intent.putExtra("DATA", bytes);
                        intent.putExtra("TYPE", type);
                        intent.putExtra("FRAG", frag);
                        intent.putExtra("MODE", (int)Profile.mode);
                        intent.putIntegerArrayListExtra("RAND", Qlist);
                        startActivity(intent);
                        // Use the bytes to display the image
                    }
                }).addOnFailureListener(new OnFailureListener() {
                    @Override
                    public void onFailure(@NonNull Exception exception) {
                        Hideprogress();
                        Toast.makeText(getActivity(), exception.getMessage(), Toast.LENGTH_LONG).show();
                        // Handle any errors
                    }
                });
                break;
            case 1:
                Showprogress();
                randomNum(NOF);
                storageRef.child("Waec-Jamb").child("Solvequestionsmode").child("Algebra").child("Questions").child("Q" + Qlist.get(0) + ".jpg")
                        .getBytes(Long.MAX_VALUE).addOnSuccessListener(new OnSuccessListener<byte[]>() {
                    @Override
                    public void onSuccess(byte[] bytes) {
                        Hideprogress();
                        Intent intent = new Intent(getActivity(), Questions.class);
                        intent.putExtra("DATA", bytes);
                        intent.putExtra("TYPE", type);
                        intent.putExtra("FRAG", frag);
                        intent.putExtra("MODE", (int)Profile.mode);
                        intent.putIntegerArrayListExtra("RAND", Qlist);
                        startActivity(intent);
                        // Use the bytes to display the image
                    }
                }).addOnFailureListener(new OnFailureListener() {
                    @Override
                    public void onFailure(@NonNull Exception exception) {
                        Hideprogress();
                        Toast.makeText(getActivity(), exception.getMessage(), Toast.LENGTH_LONG).show();
                        // Handle any errors
                    }
                });
                break;
        /*    case 2:
                Showprogress();
                randomNum(NOF);
                storageRef.child("Waec-Jamb").child("Takemockexammode").child("WAEC").child("Questions").child("Q" + Qlist.get(0) + ".JPG")
                        .getBytes(Long.MAX_VALUE).addOnSuccessListener(new OnSuccessListener<byte[]>() {
                    @Override
                    public void onSuccess(byte[] bytes) {
                        Hideprogress();
                        Intent intent = new Intent(getActivity(), Questions.class);
                        intent.putExtra("DATA", bytes);
                        intent.putExtra("TYPE", type);
                        intent.putExtra("FRAG", frag);
                        intent.putExtra("MODE", Mode);
                        intent.putIntegerArrayListExtra("RAND", Qlist);
                        startActivity(intent);
                        // Use the bytes to display the image
                    }
                }).addOnFailureListener(new OnFailureListener() {
                    @Override
                    public void onFailure(@NonNull Exception exception) {
                        Hideprogress();
                        Toast.makeText(getActivity(), exception.getMessage(), Toast.LENGTH_LONG).show();
                        // Handle any errors
                    }
                });
                break;
*/
            default:
                throw new NoSuchElementException();
        }
    }

    @Override
    public void getImage_G() {

        View v = view.findViewById(R.id.snack);
        snackbar = Snackbar.make(v, "Geometry coming soon", Snackbar.LENGTH_LONG);
        View sbView = snackbar.getView();
        sbView.setBackgroundColor(getResources().getColor(R.color.light_font));
        TextView textView = sbView.findViewById(android.support.design.R.id.snackbar_text);
        textView.setTextColor(getResources().getColor(R.color.company_color));
        snackbar.show();
    }

    @Override
    public void getImage_S() {
        View v = view.findViewById(R.id.snack);
        snackbar = Snackbar.make(v, "Integers coming soon", Snackbar.LENGTH_LONG);
        View sbView = snackbar.getView();
        sbView.setBackgroundColor(getResources().getColor(R.color.light_font));
        TextView textView = sbView.findViewById(android.support.design.R.id.snackbar_text);
        textView.setTextColor(getResources().getColor(R.color.company_color));
        snackbar.show();
    }

    @Override
    public void getImage_T() {
        View v = view.findViewById(R.id.snack);
        snackbar = Snackbar.make(v, "Mensuration coming soon", Snackbar.LENGTH_LONG);
        View sbView = snackbar.getView();
        sbView.setBackgroundColor(getResources().getColor(R.color.light_font));
        TextView textView = sbView.findViewById(android.support.design.R.id.snackbar_text);
        textView.setTextColor(getResources().getColor(R.color.company_color));
        snackbar.show();
    }

    @Override
    public void getImage_F() {
        View v = view.findViewById(R.id.snack);
        snackbar = Snackbar.make(v, "Numbers coming soon", Snackbar.LENGTH_LONG);
        View sbView = snackbar.getView();
        sbView.setBackgroundColor(getResources().getColor(R.color.light_font));
        TextView textView = sbView.findViewById(android.support.design.R.id.snackbar_text);
        textView.setTextColor(getResources().getColor(R.color.company_color));
        snackbar.show();
    }

    @Override
    public void getImage_M() {

        View v = view.findViewById(R.id.snack);
        snackbar = Snackbar.make(v, "Sets & Logic coming soon", Snackbar.LENGTH_LONG);
        View sbView = snackbar.getView();
        sbView.setBackgroundColor(getResources().getColor(R.color.light_font));
        TextView textView = sbView.findViewById(android.support.design.R.id.snackbar_text);
        textView.setTextColor(getResources().getColor(R.color.company_color));
        snackbar.show();

    }

    @Override
    public void getImage_N() {

        View v = view.findViewById(R.id.snack);
        snackbar = Snackbar.make(v, "Statistics coming soon", Snackbar.LENGTH_LONG);
        View sbView = snackbar.getView();
        sbView.setBackgroundColor(getResources().getColor(R.color.light_font));
        TextView textView = sbView.findViewById(android.support.design.R.id.snackbar_text);
        textView.setTextColor(getResources().getColor(R.color.company_color));
        snackbar.show();
    }


    public void getWaec(){

    }

    public void getGce(){

    }

    public void getNeco(){

    }

    public void getJamb(){

    }

    public void Clicked(ListView listView) {

        listView.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> adapterView, View view, int i, long l) {

                switch (i) {
                    case 0:
                        getImage_A();
                        type = i;
                        break;
                    case 1:
                        getImage_G();
                        type = i;
                        break;
                    case 2:
                        getImage_S();
                        type = i;
                        break;
                    case 3:
                        getImage_T();
                        type = i;
                        break;
                    case 4:
                        getImage_F();
                        type = i;
                        break;
                    case 5:
                        getImage_M();
                        type = i;
                        break;
                    case 6:
                        getImage_N();
                        type = i;
                        break;
                    default:
                        Log.e("Error", "Invalid Click");
                        type = Integer.parseInt(null);
                        break;
                }

            }
        });
    }

    @Override
    public void Showprogress() {
        progress = new ProgressDialog(getActivity());
        progress.setMessage("Opening....");
        progress.setProgressStyle(ProgressDialog.STYLE_SPINNER);
        progress.setIndeterminate(true);
        progress.setProgress(0);
        progress.show();
        progress.setCancelable(false);

    }

    @Override
    public void Hideprogress() {
        progress.dismiss();
    }

    @Override
    public void randomNum(int Nof) {

        Qlist = new ArrayList<>();
        Test test = new Test(Nof);

        for (int i = 0; i < Nof; i++)
            Qlist.add(test.nextRnd());

    }

    @Override
    public void onResume() {
        super.onResume();

        mp = new MediaPlayer();
        mSurfaceView = getActivity().findViewById(R.id.surface);
        mSurfaceView.getHolder().addCallback(this);
    }

    @TargetApi(Build.VERSION_CODES.LOLLIPOP)
    @Override
    public void surfaceCreated(SurfaceHolder surfaceHolder) {

        Uri video = Uri.parse("android.resource://" + getActivity().getPackageName() + "/"
                + R.raw.pencil_down);

        try {
            mp.setDataSource(getActivity().getApplicationContext(),video);
        } catch (IOException e) {
            e.printStackTrace();
        }
        try {
            mp.prepare();
        } catch (IOException e) {
            e.printStackTrace();
        }

        //Start video
        mp.setDisplay(surfaceHolder);
        mp.setLooping(true);
        mp.start();

    }

    @Override
    public void surfaceChanged(SurfaceHolder surfaceHolder, int i, int i1, int i2) {

    }

    @Override
    public void surfaceDestroyed(SurfaceHolder surfaceHolder) {

    }



    /**
     * This interface must be implemented by activities that contain this
     * fragment to allow an interaction in this fragment to be communicated
     * to the activity and potentially other fragments contained in that
     * activity.
     * <p>
     * See the Android Training lesson <a href=
     * "http://developer.android.com/training/basics/fragments/communicating.html"
     * >Communicating with Other Fragments</a> for more information.
     */
    public interface OnFragmentInteractionListener {
        // TODO: Update argument type and name
        void onHomeFragmentInteraction(Uri uri);
    }


}

class Test {
    private final Random random = new Random();
    private final int range;
    private int previous;

    Test(int range) {
        this.range = range;
    }

    int nextRnd() {
        if (previous == 0) return previous = random.nextInt(range) + 1;
        final int rnd = random.nextInt(range - 1) + 1;
        return previous = (rnd < previous ? rnd : rnd + 1);
    }
}